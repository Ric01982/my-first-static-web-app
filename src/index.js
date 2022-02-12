let tokenResource = "storage.azure.com"
let storageAccount = "ricostorage12"
let tableName = "tblPrinters"
let tableURI = "https://" + storageAccount + ".table.core.windows.net/" + tableName
let filters = "?"+"$"+"filter"+"=Organisation%20eq%20"+"'"+"ACME Organisation"+"'"
let key1Value = "DofHtFn5Paaz4kGb/bcm5FAAiQBb7cdyD1A1VcFZeoZj1myK93EsFqv3aYDdFRsu90vrt0Kjf1Ld8t9pqZ1sOw=="

version = "2020-10-02"
let strTime = (new Date()).toUTCString();
let strToSign = strTime + "\n" + "/"+  storageAccount + "/" + tableName;
let secret = CryptoJS.enc.Base64.parse(key1Value);
let hash = CryptoJS.HmacSHA256(strToSign, secret);
let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
let URIRequest = new Request(tableURI + filters, {
    method: 'GET',
    mode: "cors",
    headers: ({
        'x-ms-date':strTime,
        'Authorization':"SharedKeyLite " + storageAccount + ":" + hashInBase64,
        'x-ms-version':version,
        'Accept':"application/json;odata=nometadata"
    })
})


function fetchURL(URI){
fetch (URI)
    .then(response => response.json())
    .then(responseData => obj = responseData.value)
    show (obj)
}
//GetPrinterData(URIRequest)

function test (word){
console.log(word)
}

test("hello")
let work = fetchURL(URIRequest)

//tableData = GetPrinterData(URIRequest)

//document.getElementById('p1').innerHTML = "test";


//document.getElementById('p1').innerHTML = tableData;


/*document.getElementById(p1).innerHTML = tableData;

.then(tableQueryResponse => tableQueryResponse.json())
.then(tableQueryPromiseData => {
    tableData = tableQueryPromiseData.value
    console.log (tableData)
})
}

let data = GetPrinterData

new Tabulator("#printerTable", {
        height:800,
        data:tableData,
        layout:"fitDataFill",
        autoColumns:true,
        index:"RowKey",
        autoResize:true
        })

let tabledata1 = [tableData.slice(0,5)]

new Tabulator("#23printerTable", {
    data:tableData,
    autoColumns:true,
    index:"RowKey"
    })




// Decode the Stringjson




/*
let tableQueryData = []





async function getPrinterData() {
await fetch(URIRequest)
.then((tableQueryResponse) => {
    return tableQueryResponse.json();
})

.then((tableQueryPromiseData) => {
tableQueryData = tableQueryPromiseData.value;
})
}

getPrinterData()


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
let decodedStringBtoA = 'Hello World!';

// Encode the String
let encodedStringBtoA = btoa(decodedStringBtoA);
console.log(encodedStringBtoA);

// Define the string
let encodedStringAtoB = 'SGVsbG8gV29ybGQh';

// Decode the String
let decodedStringAtoB = atob(encodedStringAtoB);
console.log(decodedStringAtoB);

let decodedStringBtoA = 'Hello World!';
let encodedStringBtoA = btoa(decodedStringBtoA);
document.body.innerHTML = encodedStringBtoA
*/