let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let n;


//get total
function gettotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value)
        -discount.value;
        total.innerHTML=result;
        total.style.background='green'
    }
    else{
total.innerHTML=''
total.style.background='#a00d02'
    };
};
//create product
let datpro=[];
if(localStorage.product!=null){
    datpro=JSON.parse(localStorage.product)
}
else{
    let datpro=[];
}
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value!=''&&category.value!=''){
        if(mood==='create'){
            if(newpro.count > 1){
                datpro.push(newpro)
            }
        }else{
            datpro[n]=newpro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
            
    }
    }
        
        
    
    
    localStorage.setItem('product' , JSON.stringify(datpro))
    showdata()
    cleardata()
    gettotal()
   
}
//clear data
function cleardata(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}

//read
function showdata(){
    let tabel='';
    gettotal()
    for(let i=0;i<datpro.length;i++){
        tabel+=`
        <tr>
        <td>${i}</td>
        <td>${datpro[i].title}</td>
        <td>${datpro[i].price}</td>
        <td>${datpro[i].taxes}</td>
        <td>${datpro[i].ads}</td>
        <td>${datpro[i].discount}</td>
        <td>${datpro[i].total}</td>
        <td>${datpro[i].category}</td>
        <td>${datpro[i].count}</td>
        <td><button onclick="updatedata(${i})" id="update" style='width:100%;'>Update</button></td>
        <td><button id="delete"  onclick="deletedata(${i})"  style='width:100%;' class='deleteall'>Delete</button></td>
       </tr>
        `
    }
    document.getElementById('tbody').innerHTML=tabel;
    let btndelete=document.getElementById('deleteall')
    let lblall=document.getElementById('lblall')
    let notlbl=document.getElementById('not')
    if(datpro.length>0){
        btndelete.innerHTML=`<button  onclick="deletall()", class='deleteall'>Delete all</button>`;
        lblall.innerHTML=`<lable>You have <span style= 'color: red;'>${datpro.length}</span> products</lable>`;
    }
    else{
        btndelete.innerHTML='';
    }
}
showdata()
//delete
function deletedata(i){
datpro.splice(i,1)
lblall.innerHTML=`<lable style='display: none;'>You have 0 products</lable>`;

localStorage.product=JSON.stringify(datpro)
showdata()
}
//delet all
function deletall(){
    localStorage.clear()
    datpro.splice(0)
    lblall.innerHTML=`<lable style='display: none;'>You have 0 products</lable>`;
    showdata()
    }
 //update
 function updatedata(i){
    title.value=datpro[i].title
    price.value=datpro[i].price
    ads.value=datpro[i].ads
    discount.value=datpro[i].discount
    taxes.value=datpro[i].taxes
    gettotal()
    category.value=datpro[i].category
    submit.innerHTML='Update';
    count.style.display='non    e';
    n=i
    mood='update'
    scroll({
        top:0,
        behavio:'smooth'
    })
 }
 //serch
 let serchmood='title';
function getserch(id){
    let serch=document.getElementById('serch')
if(id=='srechtitle'){
    serchmood='title';
    serch.placeholder='Search By Title';
}else{
    serchmood='category';
    serch.placeholder='Search By Category';
}
serch.focus()
    serch.value='';
    showdata();
}
function serchdata(value){
    let tabel='';
if(serchmood=='title'){
    for(let i=0;i<datpro.length;i++){
        if(datpro[i].title.includes(value.toLowerCase())){
            tabel+=`
            <tr>
            <td>${i}</td>
            <td>${datpro[i].title}</td>
            <td>${datpro[i].price}</td>
            <td>${datpro[i].taxes}</td>
            <td>${datpro[i].ads}</td>
            <td>${datpro[i].discount}</td>
            <td>${datpro[i].total}</td>
            <td>${datpro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update" style='width:100%;'>Update</button></td>
            <td><button id="delete" onclick="deletedata(${i})" style='width:100%;' class='deleteall'>Delete</button></td>
            </tr>
            `
         
        }
    }
}
else{
    for(let i=0;i<datpro.length;i++){
        if(datpro[i].category.includes(value.toLowerCase())){
            tabel+=`
            <tr>
            <td>${i}</td>
            <td>${datpro[i].title}</td>
            <td>${datpro[i].price}</td>
            <td>${datpro[i].taxes}</td>
            <td>${datpro[i].ads}</td>
            <td>${datpro[i].discount}</td>
            <td>${datpro[i].total}</td>
            <td>${datpro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">Update</button></td>
            <td><button id="delete"  onclick="deletedata(${i})">Delete</button></td>
            </tr>
            `
           
        }
    }
}
document.getElementById('tbody').innerHTML=tabel;
}

