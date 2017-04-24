detectableWithVB = False
If ScriptEngineMajorVersion >= 2 then
	detectableWithVB = True
End If

Function detectActiveXControl(activeXControlName)
	on error resume next
	detectActiveXControl = False
	If detectableWithVB Then
		detectActiveXControl = IsObject(CreateObject(activeXControlName))
	End If
End Function

Function detectQuickTimeActiveXControl()
	on error resume next
	detectQuickTimeActiveXControl = False
	If detectableWithVB Then
		detectQuickTimeActiveXControl = False
		hasQuickTimeChecker = false
		Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1")
		If IsObject(hasQuickTimeChecker) Then
			If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then
				detectQuickTimeActiveXControl = True
			End If
		End If
	End If
End Function