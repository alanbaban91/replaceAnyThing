Replace Multiple Objects While Preserving Aspect Ratio (No Stretch)

Replace Multiple Objects While Preserving Aspect Ratio (No Stretch)
This Adobe Illustrator ExtendScript (.jsx) automates the process of replacing any number of objects (“old”) with one “new” reference object, preserving the new object’s original aspect ratio (no stretching). The script supports objects scattered across multiple artboards. By default, it aligns the top-left corners of the replaced objects, but you can easily modify it to center-align or use a different pivot.

Features
Batch Replacement
Replace multiple “old” objects across one or more artboards with a single “new” reference object.
Preserves Aspect Ratio
The replacement never becomes distorted. The script calculates a uniform scale factor (matching either width or height) to fit into each old object’s bounding box.
Multi-Artboard Compatibility
Works seamlessly across different artboards in the same Illustrator document—no special handling needed.
Easy Alignment
By default, newly placed objects are aligned by top-left corner. You can comment/uncomment code to switch to center alignment if needed.
Non-Destructive
The original “new” reference object remains intact at its original position. The script creates duplicates for each replacement.
Usage
Select Objects

In Adobe Illustrator, select exactly one “new” object first (your reference).
Then select one or more “old” objects to replace.
(The order matters: the first item selected is the “new” reference object.)
Run the Script

Go to File > Scripts > Other Script... and choose this ReplaceMultipleObjectsAspectRatio.jsx.
The script will create duplicates of your “new” object, scale them uniformly to fit each old object’s bounding box, and remove the old objects.
Result

A dialog will pop up confirming how many objects were replaced.
The original “new” object is re-selected, while all replacements are now in place—scaled proportionally with no stretching.
