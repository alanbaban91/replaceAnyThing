# replaceAnyThing
This Adobe Illustrator ExtendScript (.jsx) automates the process of replacing any number of objects (“old”) across multiple artboards with one “new” reference object. Unlike simple width/height matching, this script scales objects proportionally so that the replacement never becomes distorted or “stretched.” It identifies the limiting dimension (width or height) of each old object’s bounding box to maintain the new object’s original aspect ratio.

How It Works
Selection & Setup

Select exactly one “new” object first, followed by one or more “old” objects (spread across any number of artboards).
The script then isolates this first selection item as the “new” reference object and reorders it to the front so duplications are consistent.
Loop Over Old Objects

For each old object in the selection, the script duplicates the “new” reference object (leaving the original untouched).
It calculates the old object’s bounding box (width, height) and compares it to the “new” object’s bounding box.
Aspect Ratio Preservation

To avoid stretching or squashing, the script matches only the limiting dimension.
If the old bounding box is comparatively “wider” than the new object (in aspect ratio terms), the script scales by height. If it’s “narrower,” it scales by width.
This ensures the new copy’s aspect ratio remains intact.
Positioning

Top-Left Alignment: The script moves the scaled copy so its top-left corner lines up with the old object’s top-left corner.
If you want center alignment, you can adjust the code to compute centers and align them accordingly (commented code snippet included).
Cleanup

The script removes the old object once the scaled copy is placed.
After iterating through all old objects, it reselects the original new object and displays an alert indicating how many items were replaced.
Multi-Artboard Compatibility

The code works seamlessly across multiple artboards because bounding boxes in Illustrator are calculated in document space. There’s no need for special artboard handling.
Usage Steps
Select Objects

In your Illustrator document, select one “new” reference object first.
Then select all the “old” objects you want to replace (can be anywhere in the document, including on different artboards).
Run the Script

Go to File > Scripts > Other Script... and choose this .jsx file.
The script will iterate through each old object, duplicate the new object, proportionally scale the duplicate to fit the old object’s bounding box, align it, and remove the old object.
Done

You’ll see an alert once the process finishes. The document will now contain uniformly scaled duplicates of your new object in place of each old object, preserving aspect ratio with no stretching.
