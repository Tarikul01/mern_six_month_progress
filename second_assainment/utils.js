export const template =(children)=>(`<!DOCTYPE html>
<html>
<head>
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
div{
    width:100vw;
    height:100vh;
    color:white;
    background-color:black;
    font-size:30px;
    display:flex;
    justify-content:center;
    align-items:center;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>
</head>
<body>

<ul>
  <li><a class="active" href="/">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/contact">Contact</a></li>
  <li><a href="/apidata">Api data</a></li>
</ul>
<div>

${children}
</div>

</body>
</html>


`);

// export const pageDesing=``
// export const template="hello";

// const template=()=>{
//     return 'hello';
// }

// module.exports=template;
