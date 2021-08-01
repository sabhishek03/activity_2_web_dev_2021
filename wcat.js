let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);

let optionArr = [];
let filesArr =[];
for(let i=0;i<inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}


for(let i=0;i<filesArr.length;i++){
    if(fs.existsSync(filesArr[i])==false){
        console.log("file does not exist");
        return;
    }
}

let content = "";

for(let i=0;i<filesArr.length;i++){
    content=content+fs.readFileSync(filesArr[i])+"\r\n";
}

let contentArr = content.split("\r\n");
//console.log(optionArr);

let isPresent = optionArr.includes("-s");
if(isPresent){
for(let i=1;i<contentArr.length;i++){
    if(contentArr[i]=="" && contentArr[i-1]==""){
        contentArr[i]=null;
    }else if(contentArr[i]=="" && contentArr[i-1]==null){
        contentArr[i]=null;
    }
}


let tempArr = [];

for(let i=0;i<contentArr.length;i++){
    if(contentArr[i]!=null){
        tempArr.push(contentArr[i]);
    }
}
contentArr=tempArr;
}

//console.log(contentArr.join("\n"));

let indexOfN = optionArr.indexOf("-n");
let indexOfB = optionArr.indexOf("-b");
let finalOption = "";
if(indexOfN>-1 && indexOfB>-1){
    if(indexOfN<indexOfB){
        finalOption="-n";
    }else{
        finalOption="-b";
    }
}else{
    if(indexOfN>-1){
        finalOption="-n";
    }else if(indexOfB>-1){
        finalOption="-b";
    }
}

if(finalOption!=""){
    if(finalOption=="-n"){
        modifyContentByN(contentArr);
    }else if(finalOption=="-b"){
modifyContentByB(contentArr);
    }
}

function modifyContentByN(contentArr){
    for(let i = 0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
}

function modifyContentByB(contentArr){
    let count =1;
    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i] = count +" "+ contentArr[i];
            count++;
        }
    }
}

console.log(contentArr);
console.log("'''''''''''''");
console.log(contentArr.join("\r\n"));