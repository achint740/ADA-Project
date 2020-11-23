function create_header_orders(){

    var tablehead = document.createElement("thead")

    var header_row = document.createElement("tr")
    
    var th,th_data

    th = document.createElement("th")
    th_data = document.createTextNode("Order ID")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Date & Time")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Order")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Payment Amount")
    th.appendChild(th_data)
    header_row.appendChild(th)

    tablehead.appendChild(header_row);
    document.getElementById('orders').appendChild(tablehead)
}

function create_header_res(){

    var tablehead = document.createElement("thead")

    var header_row = document.createElement("tr")
    
    var th,th_data

    th = document.createElement("th")
    th_data = document.createTextNode("Table ID")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Date")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Time")
    th.appendChild(th_data)
    header_row.appendChild(th)

    th = document.createElement("th")
    th_data = document.createTextNode("Members")
    th.appendChild(th_data)
    header_row.appendChild(th)

    tablehead.appendChild(header_row);
    document.getElementById('res').appendChild(tablehead)
}

function refresh(){
    console.log("Printing Previous Orders & Reservations : \n")

    $.get('/cart/history',(data)=>{
        var table_order = document.getElementById('orders')
        
        if(data.length>0){
            $('#oh').show()
            create_header_orders()
        }

        var tbody = document.createElement('tbody')

        data.forEach((order)=>{
            
            // New Row
            var tr = document.createElement('tr')

            //Order ID
            var order_td = document.createElement('td')
            var order_text = document.createTextNode(order.orderId)
            order_td.appendChild(order_text)
            tr.appendChild(order_td)

            //Date
            var date_td = document.createElement('td')
            var date_text = document.createTextNode(order.createdAt)
            date_td.appendChild(date_text)
            tr.appendChild(date_td)

            //OrderData
            var order_td = document.createElement('td')
            var order_list = document.createElement('ol')
            var myOrder = order.orderData
            Object.keys(myOrder).forEach((key,index)=>{
                var order_li = document.createElement('li')
                var li_text = document.createTextNode(key + "(" + myOrder[key][1] + ")")
                order_li.appendChild(li_text)
                order_list.appendChild(order_li)
            })
            order_td.appendChild(order_list)
            tr.appendChild(order_td)

            //PaymentAmount
            var payment_td = document.createElement('td')
            var payment_text = document.createTextNode(order.paymentAmount)
            payment_td.appendChild(payment_text)
            tr.appendChild(payment_td)

            tbody.appendChild(tr)

        })
        table_order.appendChild(tbody)
    })

    $.get('/reservation/history',(data)=>{
        var table_res = document.getElementById('res')
        
        if(data.length>0){
            $('#rh').show()
            create_header_res()
        }

        var tbody = document.createElement('tbody')
        data.forEach((reservation)=>{
            console.log(reservation)
            var tr = document.createElement('tr')

            //Table ID
            var tableId_td = document.createElement('td')
            var tableId_text = document.createTextNode(reservation.tableId)
            tableId_td.appendChild(tableId_text)
            tr.appendChild(tableId_td)

            //Date
            var date_td = document.createElement('td')
            var date_text = document.createTextNode(reservation.entryDate)
            date_td.appendChild(date_text)
            tr.appendChild(date_td)

            //Time
            var time_td = document.createElement('td')
            var time_text = document.createTextNode(reservation.startTime + " - " + reservation.endTime)
            time_td.appendChild(time_text)
            tr.appendChild(time_td)

            //Members
            var members_td = document.createElement('td')
            var members_text = document.createTextNode(reservation.members)
            members_td.appendChild(members_text)
            tr.appendChild(members_td)

            tbody.appendChild(tr)

        })
        table_res.appendChild(tbody)
    })
}

$(()=>{
    $('#oh').hide()
    $('#rh').hide()
    refresh()
})
