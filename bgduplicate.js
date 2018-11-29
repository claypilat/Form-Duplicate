

function confirmation(context) {

var confirmStrings = { text:"Are you sure you want to create" + formContext.getAttribute("emp_contractyear").getValue() + "forms?", title:"Confirmation Dialog" };
var confirmOptions = { height: 200, width: 450 };

Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
function (success) {    
    if (success.confirmed) {
        OnChange_boolean(context);
        console.log("Dialog closed using OK button.");
        return true;
    }
     
    else
        console.log("Dialog closed using Cancel button or X.");
        return false;
});

}

function OnChange_boolean(context) {
    var formContext = context.getFormContext();
        
            if ( !confirmation(context))
                return;
        
            var oBool = formContext.getAttribute("emp_togglecreateform");
            if (oBool == null)
                        return;
            
            var boolValue = oBool.getValue();
            if (boolValue == null)
                        boolValue = false;
            
            if (boolValue == true) {
                counterForm(context);
            }
}

function counterForm(context) {
    var formContext = context.getFormContext();
    var num = formContext.getAttribute("emp_contractyear");

    var setLookup = new Array();
    setLookup[0] = new Object();
    setLookup[0].id = formContext.data.entity.getId(emp_connectionid);
    setLookup[0].name = formContext.data.entity.getEntityName(emp_connection);
    setLookup[0].entityType = "emp_connection";

    // formContext.data.entity.getEntityReference();

    Xrm.Page.getAttrubute("emp_connectionid").setValue(setLookup);


    if (num == null)
        return;

    if (num.getValue() == null)
        return;

    var data = {
        "emp_name": setLookup,
        // "Related Connection": " ",
        "emp_contractyear": 1++
        // "Toggle Create Form": " ",
        // "Contract End Date": " ",
        // "FR Amount": " ",
        // "BG Amount": " ",
        // "Bank Guarantee Notes": " ",
        // "Owner": " ",
    };

    for (i = 1; i < num.getValue(); i++) {
         Xrm.WebApi.createRecord("emp_bankguarantee", data).then(
            function success(result) {
                console.log("Bank Guarantee created with ID: " + result.id);
            },
            function (error) {
                console.log(error.message);
            }
        );
    }

}