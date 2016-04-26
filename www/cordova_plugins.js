cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/net.ninjaenterprises.nuance/www/nuancespeechkit.js",
        "id": "net.ninjaenterprises.nuance.NuancePlugin",
        "pluginId": "net.ninjaenterprises.nuance",
        "clobbers": [
            "NuancePlugin"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-sqlite-storage": "1.2.0",
    "net.ninjaenterprises.nuance": "0.1.0",
    "phonegap-plugin-barcodescanner": "4.1.0"
}
// BOTTOM OF METADATA
});