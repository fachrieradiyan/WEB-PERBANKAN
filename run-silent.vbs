Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get current directory
strCurrentDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Path to index.html
strIndexPath = strCurrentDir & "\index.html"

' Check if file exists
If objFSO.FileExists(strIndexPath) Then
    ' Open in default browser (silent mode - no command window)
    objShell.Run """" & strIndexPath & """", 0, False
Else
    MsgBox "Error: index.html not found!" & vbCrLf & vbCrLf & "Path: " & strIndexPath, vbCritical, "Investra - Error"
End If

Set objShell = Nothing
Set objFSO = Nothing
