function fivaa(input){
    var z ='';
    for(var i=1; i<=input; i++){
        z += `${input-i}`;
        z += `${input-i}`;
        for(var j=i; j<=5; j++){
            z += `${(input+2)-i}`;
        }
        z += '\n';
    }
    console.log(z);
}

fivaa(5);