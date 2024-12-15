/**
 * Replace multiple objects with one "new" object, preserving aspect ratio 
 * (no stretching). The replacement will scale uniformly (by width or height) 
 * to fit each old object's bounding box.
 *
 * Usage:
 * 1. Select in Illustrator:
 *    - Exactly ONE "new" object first (the reference),
 *    - Then ANY NUMBER of "old" objects to replace (on any artboard).
 * 2. Run this script.
 *
 * For each old object:
 *  - A copy of the "new" object is made.
 *  - The copy is scaled uniformly (aspect ratio preserved) so it fits the
 *    old object's bounding box by matching either width or height.
 *  - The script places the scaled copy (top-left alignment) and removes the old object.
 */

#target illustrator

function replaceMultipleObjectsAspectRatio() {
    if (app.documents.length === 0) {
        alert("No document is open. Please open a document and try again.");
        return;
    }

    var doc = app.activeDocument;
    var sel = doc.selection;

    if (!sel || sel.length < 2) {
        alert("Please select at least 2 objects:\n" +
              "1) The new object (reference),\n" + 
              "2) One or more old objects to replace.");
        return;
    }

    // First selected item is the "new" reference object
    var newObject = sel[0];

    // All subsequent items are old objects to be replaced
    var oldObjects = [];
    for (var i = 1; i < sel.length; i++) {
        oldObjects.push(sel[i]);
    }

    // Bring the new object to the front so duplication is predictable
    doc.selection = null;
    newObject.selected = true;
    app.executeMenuCommand('cut');
    app.executeMenuCommand('pasteFront');
    newObject = doc.selection[0];
    doc.selection = null;

    // Loop over each old object and replace
    for (var j = 0; j < oldObjects.length; j++) {
        replaceOneObjectNoStretch(newObject, oldObjects[j]);
    }

    // Reselect the original newObject if desired
    doc.selection = [newObject];

    alert("Done! Replaced " + oldObjects.length + " object(s) without stretching.");
}

/**
 * Replace a single old object with a copy of newObj, 
 * scaling uniformly (aspect ratio preserved).
 */
function replaceOneObjectNoStretch(newObj, oldObj) {
    // Duplicate the new object
    var newCopy = newObj.duplicate();

    // Get bounding boxes
    var oldBounds = oldObj.visibleBounds;  // [x1, y1, x2, y2]
    var newBounds = newCopy.visibleBounds;

    // Calculate widths/heights
    var oldWidth  = oldBounds[2] - oldBounds[0];
    var oldHeight = oldBounds[1] - oldBounds[3];

    var newWidth  = newBounds[2] - newBounds[0];
    var newHeight = newBounds[1] - newBounds[3];

    // Avoid division by zero
    if (newWidth === 0 || newHeight === 0) {
        alert("The 'new' object is degenerate (zero width/height). Skipping...");
        newCopy.remove();
        return;
    }

    // Determine uniform scale percentage based on aspect ratio
    var newAspect = newWidth / newHeight;
    var oldAspect = oldWidth / oldHeight;
    var uniformScalePercent;

    // If old bounding box is "wider" than the new object's aspect ratio, match heights; otherwise match widths
    if (oldAspect > newAspect) {
        uniformScalePercent = (oldHeight / newHeight) * 100; // match heights
    } else {
        uniformScalePercent = (oldWidth / newWidth) * 100;   // match widths
    }

    // Move new copy so that its top-left corner aligns with the old object's top-left
    newCopy.position = [oldBounds[0], oldBounds[1]];

    // Uniformly resize (aspect ratio preserved)
    newCopy.resize(
        uniformScalePercent,
        uniformScalePercent,
        true, // changePositions
        true, // changeFillPatterns
        true, // changeFillGradients
        true, // changeStrokePattern
        uniformScalePercent / 100 // optional pivot factor
    );

    // Remove the old object
    oldObj.remove();
}

// Run the main function
replaceMultipleObjectsAspectRatio();
