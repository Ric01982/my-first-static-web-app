let tokenResource = "storage.azure.com"
let storageAccount = "ricostorage12"
let tableName = "tblPrinters"
let filters = "?"+"$"+"filter"+"=Organisation%20eq%20"+"'"+"ACME Organisation"+"'"
let key1Value = "DofHtFn5Paaz4kGb/bcm5FAAiQBb7cdyD1A1VcFZeoZj1myK93EsFqv3aYDdFRsu90vrt0Kjf1Ld8t9pqZ1sOw=="

async function generateURIRequest() {
    version = "2020-10-02"
    let tableURI = "https://" + storageAccount + ".table.core.windows.net/" + tableName
    let strTime = (new Date()).toUTCString();
    let strToSign = strTime + "\n" + "/"+  storageAccount + "/" + tableName;
    let secret = CryptoJS.enc.Base64.parse(key1Value);
    let hash = CryptoJS.HmacSHA256(strToSign, secret);
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    let request = new Request(tableURI + filters, {
        method: 'GET',
        mode: "cors",
        headers: ({
             'x-ms-date':strTime,
             'Authorization':"SharedKeyLite " + storageAccount + ":" + hashInBase64,
             'x-ms-version':version,
             'Accept':"application/json;odata=nometadata"
        })
    })
    return request
}

async function fetchData(){
    try {
        const URIRequest = await generateURIRequest()
        const response = await fetch (URIRequest)
        const data = (await response.json()).value
        return data
    }
    catch(error){
        console.log("ERROR CATCH WITH fetchData")
        console.log(error)
    }
}

async function createTable(){
    try {
        const tableData = await fetchData()
        new Tabulator("#printerTable", {
            height:700,
            data:tableData,
            layout:"fitDataFill",
            autoColumns:true,
            index:"RowKey",
            autoResize:true
            })
    }
    catch(error){
        console.log("ERROR CATCH WITH createTable")
        console.log(error)
    }
}

createTable()

