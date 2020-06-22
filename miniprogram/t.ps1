function get-hash([string]$textToHash) {
    $hasher = new-object System.Security.Cryptography.MD5CryptoServiceProvider
    $toHash = [System.Text.Encoding]::UTF8.GetBytes($textToHash)
    $hashByteArray = $hasher.ComputeHash($toHash)
    foreach ($byte in $hashByteArray) {
        $result += "{0:x2}" -f $byte
    }
    return $result;
}

$pos = '30.303476213115893,109.4551419160156'
$key = 'WEZBZ-D5JWP-F5EDI-VOBGX-B33O3-F5F25'
$sk = 'LbVPiUdMRA4pPVLwqAFPCjfn3CpNHgem'
$url = "/ws/geocoder/v1?key=$key&location=$pos"
$md5 = get-hash "$url$sk"
Write-Host "https://apis.map.qq.com$url&sig=$md5"