Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "schtasks /run /tn ""TallySyncHiddenTask""", 0, False
