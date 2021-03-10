//This function is used to return the "UpdateExpression" and "ExpressionAttributeNames" for AWS.documentClient.update()
//Parameters: attributeObjString is a string that represents the the nested object name needing updated. example: myObject.nestLvl1.nestLvl2
//Return: An object containing updateExpression and expressionAttributesName
//Examples updateExpression value: updateExpression = "SET #0Prop.#1Prop.#2Prop = :value"
//Example expressionAttributeNames value: { #0Prop: "myObject", #1Prop: "nestLvl1", #2Prop: "nestLvl2" }

function updateExprAndAttrNames(attributeObjString) {
    const attributeNamesArray = attributeObjString.split('.')
    let objStringArray=[]
    for (i=0; i < attributeNamesArray.length; i++) {
        objStringArray[i] = `#${i}Prop`
    }
    const updateObjString = objStringArray.join('.')
    const updateString = `SET ${updateObjString} = :value`

    let attNamesObj = {}
    attributeNamesArray.forEach((ele, index) => {
        attNamesObj[objStringArray[index]] = ele
    })

    const paramsObj = {
        updateExpression: updateString,
        expressionAttributeNames: attNamesObj
    }
    return paramsObj
}

module.exports = {
    updateExprAndAttrNames: updateExprAndAttrNames
}