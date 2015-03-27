function addPackageDeclaration(classData) {
  var PACKAGE_DECL = 'package com.mycompany.myproject.mypackage;\n\n'
  return PACKAGE_DECL + classData
}

function addParcelAnnotation(classData) {
  var PARCEL_IMPORT = 'import org.parceler.Parcel;\n'
  var CONSTRUCTOR_START = 'public class'
  var PARCEL_ANNOTATION = '@Parcel\n'
  var parts = classData.split(CONSTRUCTOR_START, 2)
  var newData = PARCEL_IMPORT + parts[0] + PARCEL_ANNOTATION + CONSTRUCTOR_START + parts[1]
  return newData
}

function setCommonsLang3(classData) {
  var OLD_IMPORT = 'import org.apache.commons.lang.'
  var NEW_IMPORT = 'import org.apache.commons.lang3.'
  return classData.split(OLD_IMPORT).join(NEW_IMPORT)
}

module.exports = {
  processClass: function(classData, parcelable) {
    // Package declaration must come last to ensure it's at the very top
    var processors = [setCommonsLang3, addPackageDeclaration]    
    if (parcelable) processors.splice(1, 0, addParcelAnnotation)

    processors.forEach(processor => {
      classData = processor(classData)
    })

    return classData
  }
}
