

$storageAccount = "ricostorage12"
$tableName = "tblPrinters"
$tableURI = "https://$storageAccount.table.core.windows.net/$tableName"
$key1Value = "DofHtFn5Paaz4kGb/bcm5FAAiQBb7cdyD1A1VcFZeoZj1myK93EsFqv3aYDdFRsu90vrt0Kjf1Ld8t9pqZ1sOw=="


$version = "2020-10-02"
$GMTTime = (Get-Date).toString('R')

function Get-AZTableItems {
    $stringToSign = "$GMTTime`n/$storageAccount/$tableName"
    $hmacsha = New-Object System.Security.Cryptography.HMACSHA256
    $hmacsha.key = [Convert]::FromBase64String($key1Value)
    $signature = $hmacsha.ComputeHash([Text.Encoding]::UTF8.GetBytes($stringToSign))
    $signature = [Convert]::ToBase64String($signature)
    $headers = @{
        'x-ms-date'    = $GMTTime
        Authorization  = "SharedKeyLite " + $storageAccount + ":" + $signature
        "x-ms-version" = $version
        Accept         = "application/json;odata=nometadata"
                        }
$script:apiContinuationuri = $null
$script:result = $null

do {

$apirequest = Invoke-WebRequest -Uri $tableURI$filters$apiContinuationuri -Method GET -Headers $headers -Verbose
$apiresponsenextrow = $apirequest.headers.'x-ms-continuation-NextRowKey'
$apiresponsenextpartition = $apirequest.headers.'x-ms-continuation-NextPartitionKey'
$apiContinuationuri = "&NextPartitionKey="+$apiresponsenextpartition+"&NextRowKey="+$apiresponsenextrow
$script:result += @(($apirequest.Content | convertfrom-json).value)



}

until ($null -eq $apirequest.headers.'x-ms-continuation-NextRowKey')

}

function Update-AZTableItem($PartitionKey,$RowKey,$Body) {
    $stringToSign = "$GMTTime`n/$storageAccount/$tableName(PartitionKey='$PartitionKey',RowKey='$RowKey')"
    $hmacsha = New-Object System.Security.Cryptography.HMACSHA256
    $hmacsha.key = [Convert]::FromBase64String($key1Value)
    $signature = $hmacsha.ComputeHash([Text.Encoding]::UTF8.GetBytes($stringToSign))
    $signature = [Convert]::ToBase64String($signature)
    $headers = @{
        'x-ms-date'    = $GMTTime
        Authorization  = "SharedKeyLite " + $storageAccount + ":" + $signature
        "x-ms-version" = $version
        Accept         = "application/json;odata=nometadata"
                        }
Invoke-RestMethod -Uri "$tableURI(PartitionKey='$PartitionKey',RowKey='$RowKey')" -Headers $headers -Body $body -ContentType application/json -Method MERGE -Verbose

}
$filters = "?"+"$"+"filter"+"=Organisation%20eq%20"+"'"+"ACME Organisation"+"'"

get-aztableitems

$result | ft -AutoSize







