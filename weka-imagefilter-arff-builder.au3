; https://www.autoitscript.com/autoit3/docs/functions.htm

#pragma compile(Icon, 'icon.ico')
#include <File.au3>
#include <MsgBoxConstants.au3>
#include <Array.au3>
$oSC = ObjCreate("ScriptControl")
$oSC.language = "Javascript"

Func buildArff($path)
   If FileExists($path) == 1 Then
	  IF StringInStr(FileGetAttrib($path),"D")  Then
		 Local $filepath = $path & "/data.arff"
		 Local $aFileList = _FileListToArray($path, "*")
		 Local $classes = ""
		 Local $data = ""
		 Local $dataUnknown = ""
		 Local $hasUnknown = False
		 For $f = 1 To $aFileList[0]
			$filePath = $path & "/" & $aFileList[$f]

			IF IsDir($filePath) == False Then
			   Local $sDrive = "", $sDir = "", $sFileName = "", $sExtension = ""
			   Local $aPathSplit = _PathSplit($filePath, $sDrive, $sDir, $sFileName, $sExtension)

			   If $aPathSplit[4] == ".jpg" Or $aPathSplit[4] == ".png" Or $aPathSplit[4] == ".gif" Or $aPathSplit[4] == ".bmp" Then
				  ;MsgBox($MB_SYSTEMMODAL, $filePath, $aPathSplit[4])
				  ; 要取得分類名稱才行呢
				  Local $class = $oSC.eval("'" & $aPathSplit[3] & "'.substr(0, '" & $aPathSplit[3] & "'.lastIndexOf('_'))")
				  ;MsgBox($MB_SYSTEMMODAL, $filePath, $class)


				  If $class <> "unknown" Then
					 If $classes <> "" Then
						$classes = $classes & ";"
					 EndIf
					 $classes = $classes & $class

					 If $data <> "" Then
						$data = $data & @CRLF
					 EndIf
					 $data = $data & $aPathSplit[3] & $aPathSplit[4] & "," & $class
				  Else
					 $hasUnknown = True
					 $class = "?"

					 If $dataUnknown <> "" Then
						$dataUnknown = $dataUnknown & @CRLF
					 EndIf
					 $dataUnknown = $dataUnknown & $aPathSplit[3] & $aPathSplit[4] & "," & $class
				  EndIf

			   EndIf
			EndIf
		 Next

		 ;MsgBox($MB_SYSTEMMODAL, "com", $classes)
		 Local $class_arr = StringSplit($classes, ";")
		 Local $class_arr_unique = _ArrayUnique($class_arr)
		 Local $classes = _ArrayToString($class_arr_unique, ",", 2)
		 Local $relation = _ArrayToString($class_arr_unique, ";", 2)
		 ;MsgBox($MB_SYSTEMMODAL, "classes", _ArrayToString($class_arr_unique, ";", 2))

		 ;MsgBox($MB_SYSTEMMODAL, "data", $data)

		 Local $file = "@relation images_classication:" &  $relation & @CRLF
		 $file = $file & "@attribute filename string" & @CRLF
		 $file = $file & "@attribute class {" &  $classes & "}" & @CRLF
		 $file = $file & "@data" & @CRLF
		 Local $trainSet = $file & $data
		 Local $testSet = $file & $dataUnknown
		 ;MsgBox($MB_SYSTEMMODAL, "file", $file)

		 Local $train_arff_path = $path & "\train-set.arff"
		 FileDelete($train_arff_path)
		 FileWrite ( $train_arff_path, $trainSet )
		 If $hasUnknown == True Then
			Local $test_arff_path = $path & "\test-set.arff"
			FileDelete($test_arff_path)
			FileWrite ( $test_arff_path, $testSet )
			MsgBox($MB_SYSTEMMODAL, "Weka ImageFilter ARFF Builder", "ARFF is created: " & @CRLF & $train_arff_path & @CRLF & $test_arff_path)
		 Else
			MsgBox($MB_SYSTEMMODAL, "Weka ImageFilter ARFF Builder", "ARFF is created: " & @CRLF & $train_arff_path)
		 EndIf
	  EndIf
   EndIf
EndFunc

Func IsDir($sFilePath)
    Return StringInStr(FileGetAttrib($sFilePath), "D") > 0
EndFunc   ;==>IsDir

;MsgBox($MB_SYSTEMMODAL, "dir", @ScriptDir)

If $CmdLine[0] == 0 Then
   buildArff(@ScriptDir)
Else
   For $i = 1 To $CmdLine[0]
	  Local $dirPath = $CmdLine[$i]
	  buildArff($dirPath)
   Next
EndIf
