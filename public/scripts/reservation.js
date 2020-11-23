$(()=>{
  // Get the modal
  var modal = $("#myModal");

  var book = $("#book");

  var cross =$("#close");

  

  cross.click(function() {
    modal.hide();
    $('body').removeClass('blur')
    $('modal').removeClass('opaque')
  })

  // When the user clicks anywhere outside of the modal, close it
  $().click(function(event) {
    if (event.target == modal) {
      modal.hide();
    }
  })


  $('#book').click(function(){
    console.log("Submit Button was pressed")
    let date=$('#date1').val()
    let time=$('#time1').val()
    let members=$('#members').val()

    let formData={}
    formData.date=date
    formData.time=time
    formData.members = members
    console.log(formData);

    console.log('Jquery se jo date bhej rhe uski type hai: ' + typeof(formData.date))
    $.post('/reservation/bookTable',formData,function(data){
        if(data.status==0)
            alert("Not Logged In or No table available");
        else
        {
            $('body').addClass('blur')

            modal.addClass('opaque')

            modal.css("display", "block")

            $('#modalName').val(data.username)
            $('#modalTable').val(data.tableId)
            $('#modalDate').val(data.entryDate)
            $('#modalStartTime').val(data.startTime)
            $('#modalEndTime').val(data.endTime)
            $('#modalCost').val(data.cost)
            $('#modalSubmit').click(()=>{
            $.post('/reservation/confirmBooking',data,function(response){
                console.log(response)
                if(response.status==0)
                {
                  alert('There was an error while booking this table.\n Please try again')
                }
                else {
                  alert('Booking Confirmed')
                }
              })
            })
        }
      
    })
  })
})
