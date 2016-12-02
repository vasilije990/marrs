var cameras = {
  curiosity:['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
  opportunity:['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM'],
  spirit:['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM']
};
function switchRover(name, cameras){
          getRoverData(name);
           checkbox(name, cameras)
      }
function getRoverData(name){
        
        $.ajax({
          url:'https://api.nasa.gov/mars-photos/api/v1/manifests/'+ name.toLowerCase()+'?api_key=mrKatY4Ovsr0RE4NtoUS99coeMgVuQj3RBdYpS1I',
        method:'GET'
      }).done(function(res){ 
      $("#tekst").empty();
      $('#tekst').append("<span>NAME:</span> " + res.photo_manifest.name+'<br>');
      $('#tekst').append("<span>TOTAL PHOTOS: </span> " + res.photo_manifest.total_photos+'<br>');
      $('#tekst').append("<span>MAX SOL: </span>" + res.photo_manifest.max_sol+'<br>');
      $('#tekst').append("<span>LANDING DATE: </span>" + res.photo_manifest.landing_date+'<br>');
      $('#tekst').append("<span>LAUNCH DATE: </span>" +res.photo_manifest.launch_date  +'<br>');
      $("#tekst").attr("value", name );
      var n = res.photo_manifest.max_sol.toString();
      Slajder_gen(n)
          cssrover(name)
})
}
      getRoverData('curiosity');
checkbox('curiosity',cameras)

// Generisanje slajdera
function Slajder_gen(max){        
    $(".slider").empty();
    var inp =$('<input   type = "range" max="'+max+'" value="0" min="0"  id="vasa" onchange=" Slajder(this.value) "/>')
    var spa=$("<span  id='rangevalue'>")
    spa.append('0')
    $('.slider  ').append(inp);
    $('.slider  ').append(spa);
}
// Azuriranje trenutne vrednosti slajdera
function Slajder( value ) { 
  $("#rangevalue").empty();
  $("#rangevalue").append(value)
  $("#vasa").attr("value", value );
 }
 //Generise slike sa desne strane
 function show(cameras){
 var cc=$("#vasa").attr("value");
 var sol=parseInt(cc);
 var aa=$("#tekst").attr("value");
 var cameraa=  provera_checkbox(cameras,aa);
$(".galerija").empty();
 for (var i = 0; i < cameraa.length; i++) {
zaxtev(aa,sol,cameraa[i] )
 } 
 }
//Salje zahtev na osnovu parametara: ime rovera, solarani dan i oznacenih kamera. 
function zaxtev(rover,sol,came)
{
         $.ajax({
          dataType: "json",
          url:'https://api.nasa.gov/mars-photos/api/v1/rovers/'+ rover.toLowerCase()+'/photos?sol='+ sol+'&camera='+ came.toLowerCase()+'&api_key=mrKatY4Ovsr0RE4NtoUS99coeMgVuQj3RBdYpS1I',
        method:'GET'
      }).done(function(res){ 
for (var i = 0; i < res.photos.length; i++) {
var slikaDIV=$('<div class="slika"><img src="'+res.photos[i].img_src+'" data-toggle="modal" data-target="#myModal'+res.photos[i].id+'"  alt=""><div class="modal fade" id="myModal'+res.photos[i].id+'" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-body"><img src="' + res.photos[i].img_src + '" data-toggle="modal" data-target="#myModal'+res.photos[i].id+'" alt=""></div></div></div></div> ')

  $('.galerija').append(slikaDIV); 
       
}    
}) 
}
//pravi niz u kome se nalaze stiklirane kamere
function provera_checkbox( kame, cc )
{
 
var d = document.getElementsByName("chk");
  var dvalue =[ ];
for(var i = 0; i < d.length; i++)
 { 
     if(d[i].checked){  
      dvalue.push( kame[cc][i]);
     }
  }
  return dvalue; 
}
//Generise checkbox na osnovu izabranog rovera. 
function checkbox(name,cameras){
  $("#chk").empty();
  for (var i = 0; i < cameras[name].length; i++) {
   
var cam_chec=$('<input type="checkbox" name="chk" value="'+(i+1)+'" />'+cameras[name][i]+'<br>')

$("#chk").append(cam_chec)

}
}
function cssrover(rover){ if(rover==='curiosity')  
{$('#curiosity img').css({'border': '3px solid grey','opacity': '0.7'});$('#spirit img, #opportunity img, #spirit img').css({'border': '3px solid transparent','opacity': '1' });} 
if(rover==='opportunity')  
{$('#opportunity img').css({'border': '3px solid grey', 'opacity': '0.7'});$('#curiosity img, #spirit img').css({'border': '3px solid transparent', 'opacity': '1'});} 
if(rover==='spirit')  
{$('#spirit img').css({'border': '3px solid grey','opacity': '0.7'});$('#curiosity img, #opportunity img').css({'border': '3px solid transparent','opacity': '1'});} }
