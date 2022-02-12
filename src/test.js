var tokenResource = "storage.azure.com"
var storageAccount = "stupprinters003"
var tableName = "tblPrinters"
var URI = "https://" + storageAccount + ".table.core.windows.net/" + tableName
var filters = "?"+"$"+"filter"+"=Organisation%20eq%20"+"'"+"Ministry of Justice"+"'"

var strTime = (new Date()).toUTCString()
var version = "2020-10-02"
var tokenUri = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2F" + tokenResource + "%2F"

fetch(tokenUri)
.then(response => {
    return response.json();
})
.then(token => {
    console.log(token);
})

var token = (Invoke-RestMethod -Uri $tokenUri -Method GET -Headers @{Metadata="true"}).access_token

var URIRequest = new Request(tableURI + filters, {
    method: 'GET',
    headers: ({
        'x-ms-date':strTime,
        'Authorization':"Bearer " + token,
        'x-ms-version':version,
        'Accept':"application/json;odata=nometadata"
    })
})

let tableQueryRequest;
fetch(URIRequest)
.then(function(tableQueryResponse){return tableQueryResponse.json();})
.then(function(tableQueryData){tableQueryRequest = tableQueryData;})



//document.getElementById('t1').innerHTML = tableQueryRequest.value[0]


// Decode the Stringjson




/*

 .then((myJson) => {
    console.log(myJson);
  });


stringToSign = "$GMTTime`n/$storageAccount/$tableName"
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



//https://ricostorage12.table.core.windows.net/Tables

//StringToSign = Date + "\n"
 //              CanonicalizedResource

 Define the string
var decodedStringBtoA = 'Hello World!';

// Encode the String
var encodedStringBtoA = btoa(decodedStringBtoA);
console.log(encodedStringBtoA);

// Define the string
var encodedStringAtoB = 'SGVsbG8gV29ybGQh';

// Decode the String
var decodedStringAtoB = atob(encodedStringAtoB);
console.log(decodedStringAtoB);

var decodedStringBtoA = 'Hello World!';
var encodedStringBtoA = btoa(decodedStringBtoA);
document.body.innerHTML = encodedStringBtoA
*/