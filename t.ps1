$csv = Import-Csv $env:HOMEPATH\desktop\book1.csv
$provmap = @{}
$citymap = @{}
$counmap = @{}
$csv | ForEach-Object {
    if ($_.Code.EndsWith('0000')) {
        $provmap[$_.Code] = $_.Name
    }
    elseif ($_.Code.EndsWith('00')) {
        $citymap[$_.Code] = $_.Name
    }
    else {
        $counmap[$_.Code] = $_.Name
    }
}
$count = @{}
foreach ($key in $provmap.Keys) {
    $count[$key] = 0
}
foreach ($key in $citymap.Keys) {
    $count[$key.SubString(0, 2) + '0000']++
}

[System.Collections.ArrayList]$arr = @()
#地级市
foreach ($key in $citymap.Keys) {
    $value = $citymap[$key]
    $prov = $provmap[$key.SubString(0, 2) + '0000']
    $item = @{city = $value; cityId = $key; province = $prov; }
    $null = $arr.Add($item)
}
$zhixia = @{}
# 直辖市
foreach ($key in $count.Keys) {
    if ($count[$key] -eq 0) {
        $null = $arr.Add(@{city = $provmap[$key]; cityId = $key; province = $provmap[$key]; })
        $zhixia[$key] = 0
    }
}
# 省辖市
foreach ($key in $counmap.Keys) {
    if ($null -eq $citymap[$key.SubString(0, 4) + '00']) {
        $prov = $provmap[$key.SubString(0, 2) + '0000']
        if ($null -eq $zhixia[$key.SubString(0, 2) + '0000']) {
            $null = $arr.Add(@{city = $counmap[$key]; cityId = $key; province = $prov; })
        }
    }
}
ConvertTo-Json $arr | Out-File t.json

