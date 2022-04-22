var url, sessionurl, poseurl;
document.getElementById('sessionNo').style.display = "none";
document.getElementById('setNo').style.display = "none";
document.getElementsByClassName('yoga-info')[0].style.display = "none";
document.getElementsByClassName('dashboard')[0].style.display = "none";
document.getElementById("getData").addEventListener("click", function() {
    var date = JSON.stringify($("#datepicker1").val());
    var email = JSON.stringify($("#email").val());
    var yogatype1 = document.getElementById('Ashtanga');
    var yogatype2 = document.getElementById('Hatha');

    // console.log(yogatype);
    if (yogatype1.checked == true) {
        var yogatype = "Ashtanga";
        url = "/yogadata";
        sessionurl = "/sessiondata";
        poseurl = "/posedata";
        seturl = "/setdata"
        console.log(yogatype1);
        console.log(sessionurl);
    } else if (yogatype2.checked == true) {
        var yogatype = "Hatha";
        url = "/hathayogadata";
        sessionurl = "/hathasessiondata";
        poseurl = "/hathaposedata";
        seturl = "/hathasetdata"
        console.log(yogatype2);
        console.log(sessionurl);
    } else {
        var yogatype = "Bikram";
        url = "/bikramyogadata";
        sessionurl = "/bikramsessiondata";
        poseurl = "/bikramposedata";
        seturl = "/bikramsetdata";
        console.log(sessionurl);
    }

    $.ajax(url, {
        type: 'GET',
        data: { date: date, email: email },
        success: function(resdata) {
            document.getElementById('list').innerHTML = "";
            document.getElementById('setNo').style.display = "none";
            // document.getElementById('setNo').style.display="none";
            var totalSession = [];
            var temp = {};
            for (var i in resdata) {
                temp[resdata[i]["SessionNo"]] = resdata[i];
            }
            for (i in temp) {
                totalSession.push(temp[i]);
            }

            console.log(totalSession);
            if (totalSession.length > 0) {
                totalSession.forEach(i => {
                    console.log(i);
                    document.getElementById('list').innerHTML +=
                        `<li onclick="MYFUNCTION1(${i.SessionNo})" class="block text-center cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        ${i.SessionNo}
                    </li>`
                });
                document.getElementsByClassName('dashboard')[0].style.display = "none";
                document.getElementsByClassName('yoga-info')[0].style.display = "none";
                document.getElementById("session_detail").innerHTML = "";
                document.getElementById('sessionNo').style.display = "flex";
            } else {
                document.getElementsByClassName('dashboard')[0].style.display = "none";
                document.getElementsByClassName('yoga-info')[0].style.display = "none";
                document.getElementById("session_detail").innerHTML = "No Data Available...";
                document.getElementById('sessionNo').style.display = "none";
            }
        }
    });
});

function MYFUNCTION1(SessionNo) {
    if (document.getElementById("dropdown").classList.contains("block")) {
        document.getElementById("dropdown").classList.add("hidden");
    }
    document.getElementById('list2').innerHTML = "";

    var date = JSON.stringify($("#datepicker1").val());
    var email = JSON.stringify($("#email").val());
    $.ajax(seturl, {
        type: 'GET',
        data: { date: date, email: email, SessionNo: SessionNo },
        success: function(resdata) {
            console.log(resdata);
            console.log(resdata[0].SessionNo);
            var totalSet = [];
            var temp = {};
            for (var i in resdata) {
                temp[resdata[i]["SetNo"]] = resdata[i];
            }
            for (i in temp) {
                totalSet.push(temp[i]);
            }
            if (totalSet.length > 0) {
                document.getElementsByClassName('dashboard')[0].style.display = "none";
                document.getElementsByClassName('yoga-info')[0].style.display = "none";
                document.getElementById('set_detail').innerHTML = "";
                document.getElementById('setNo').style.display = "flex";
                totalSet.forEach(i => {
                    document.getElementById('list2').innerHTML +=
                        `<li onclick="MYFUNCTION(${i.SetNo},${i.SessionNo})" class="block text-center cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    ${i.SetNo}
                    </li>`

                });
            } else {
                document.getElementsByClassName('dashboard')[0].style.display = "none";
                document.getElementsByClassName('yoga-info')[0].style.display = "none";
                document.getElementById('set_detail').innerHTML = `No Data Available`;
            }
            console.log(totalSet);
        }
    });
}


function MYFUNCTION(SetNo, SessionNo) {
    if (document.getElementById("dropdownDivider").classList.contains("block")) {
        document.getElementById("dropdownDivider").classList.add("hidden");
    }
    var date = JSON.stringify($("#datepicker1").val());
    var email = JSON.stringify($("#email").val());
    console.log(SessionNo);
    $.ajax(sessionurl, {
        type: 'GET',
        data: { date: date, email: email, SetNo: SetNo, SessionNo: SessionNo },
        success: function(resdata) {
            console.log(resdata);
            document.getElementsByClassName('dashboard')[0].style.display = "block";
            document.getElementsByClassName('yoga-info')[0].style.display = "none";
            console.log(resdata);


            /*var labels = [];
            var datas = [];

            for (var i in resdata) {
                labels.push(resdata[i].PoseName);
                datas.push(resdata[i].Accuracy);
            }
            // chartjs
            document.getElementById('cards').innerHTML = "";
            $("#chartContainer1").empty();
            $("#chartContainer2").empty();
            $("#chartContainer3").empty();
            $("#image").empty();
            document.getElementById("chartContainer4").innerHTML = `<canvas id="myChart"></canvas>`;

            const ctx = document.getElementById('myChart').getContext('2d');

            const data = {
                datasets: [{
                    lables: labels,
                    data: datas
                }],
            }
            var config = {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    // maintainAspectRatio: false,
                }
            };
            // myChart.update();
            const myChart = new Chart(ctx, config);
*/



            var labels = [];

            for (var i in resdata) {
                labels.push({
                    label: resdata[i].PoseName,
                    y: resdata[i].Accuracy,
                    x: resdata[i]._id,

                });
            }
            console.log(labels);
            document.getElementById('cards').innerHTML = "";
            $("#chartContainer1").empty();
            $("#chartContainer2").empty();
            $("#chartContainer3").empty();
            $("#image").empty();
            var chart = new CanvasJS.Chart("chartContainer4", {
                animationEnabled: true,
                theme: "dark2",
                title: {
                    text: "Yoga Data"
                },
                data: [{
                    type: "doughnut",
                    startAngle: 60,
                    yValueFormatString: "##0.00\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: labels,
                    click: onClick
                }]
            });
            chart.render();
            resdata.forEach(item => {
                console.log(item);
                document.querySelector('.dashboard-left .cards').innerHTML += `
                <div class="card">
                        <img class="rounded-lg w-[100px] h-[100px] m-auto"  src="${item.Images}" alt="">
                    <div class="p-2 w-full flex flex-col justify-center items-center">
                        <p class="mb-2 w-full text-center text-gray-900 ">${item.PoseName}</p>
                        <p class="w-full text-center text-gray-700">${item.Accuracy}</p>
                    </div>
                </div>
                `;
            })


            // <div class="card">
            //     <img src="${item.Images}" style="width:100px; height:100px" alt="">
            //     <p>${item.PoseName}</p>
            //     <h6>${item.Accuracy}</h6>
            // </div>



            document.querySelector('.dashboard-right .cards').innerHTML = "";
            document.querySelector('.dashboard-right .cards').innerHTML += `
                    <div class="card justify-center">
                    <h4>Calories Burn:</h4>
                        <h3>${resdata[0].Kalorie}</h3>
                    </div>
                    `;
            document.querySelector('.dashboard-right .cards').innerHTML += `
                    <div class="card justify-center">
                    <h4>Session Date:</h4>
                        <h3>${resdata[0].insertDateTime}</h3>
                    </div>
                    `;
            document.querySelector('.dashboard-right .cards').innerHTML += `
                    <div class="card justify-center">
                    <h4>WorkOut Time:</h4>
                        <h3>${resdata[0].SessionTime}</h3>
                    </div>
                    `;
            document.querySelector('.dashboard-right .cards').innerHTML += `
                    <div class="card justify-center">
                    <h4>Session No:</h4>
                        <h3>${resdata[0].SessionNo}</h3>
                    </div>
                    `;
            document.querySelector('.dashboard-right .cards').innerHTML += `
                    <div class="card justify-center">
                    <h4>Total Poses:</h4>
                        <h3>${resdata.length}</h3>
                    </div>
                    `;
            /*   var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Yoga Data"
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0.00\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: labels,
                    click: onClick
                }]
            });
            chart.render();
    */
            function onClick(e) {
                var _id = e.dataPoint.x;
                $.ajax(poseurl, {
                    type: 'GET',
                    data: { _id: _id },
                    success: function(resdata) {
                        document.getElementsByClassName('yoga-info')[0].style.display = "flex";
                        var joint, dist, musc, labels = [];
                        joint = resdata.map(data => ({ jointalignmenterror: data.jointalignmenterror }))
                        musc = resdata.map(data => ({ musculoskeletals: data.musculoskeletals }))
                        dist = resdata.map(data => ({ distancealignmenterror: data.distancealignmenterror }))
                        var key1 = Object.keys(joint[0].jointalignmenterror);
                        var value1 = Object.values(joint[0].jointalignmenterror);
                        for (var j = 0; j < key1.length; j++) {
                            labels.push({
                                label: key1[j],
                                y: parseInt(value1[j])
                            });
                        };
                        console.log(labels);
                        var chart = new CanvasJS.Chart("chartContainer1", {
                            backgroundColor: "#edf1f7",
                            animationEnabled: true,
                            title: {
                                text: "JointAlignmentError"
                            },
                            data: [{
                                type: "pie",
                                startAngle: 240,
                                yValueFormatString: "##0.00\"%\"",
                                // yValueFormatString: "#,##0.0#\"%\"",
                                indexLabel: "{label} {y}",
                                dataPoints: labels
                            }]
                        });
                        chart.render();
                        /*
                        const data2 = {
                            labels: key1,
                            datasets: [{
                                label: 'JointAlignmentError',
                                data: value1,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                ],
                                borderWidth: 1
                            }]

                        }
                        const config2 = {
                            type: 'bar',
                            data: data2,
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        };
                        const myChart2 = new Chart(document.getElementById('myChart2'), config2);
*/

                        labels = [];
                        var key2 = Object.keys(dist[0].distancealignmenterror);
                        var value2 = Object.values(dist[0].distancealignmenterror);
                        for (var j = 0; j < key2.length; j++) {
                            labels.push({
                                label: key2[j],
                                y: value2[j]
                            });
                        }
                        var chart = new CanvasJS.Chart("chartContainer2", {
                            backgroundColor: "#edf1f7",
                            animationEnabled: true,
                            title: {
                                text: "DistanceAlignmentError"
                            },
                            data: [{
                                type: "pie",
                                startAngle: 240,
                                yValueFormatString: "##0.00\"%\"",
                                indexLabel: "{label} {y}",
                                dataPoints: labels,
                            }]
                        });
                        chart.render();
                        /*
                                                const data1 = {
                                                    labels: key2,
                                                    datasets: [{
                                                        label: 'DistanceAlignmentError',
                                                        data: value2,
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                            'rgba(255, 205, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(201, 203, 207, 0.2)'
                                                        ],
                                                        borderColor: [
                                                            'rgb(255, 99, 132)',
                                                            'rgb(255, 159, 64)',
                                                            'rgb(255, 205, 86)',
                                                            'rgb(75, 192, 192)',
                                                            'rgb(54, 162, 235)',
                                                            'rgb(153, 102, 255)',
                                                            'rgb(201, 203, 207)'
                                                        ],
                                                        borderWidth: 1
                                                    }]

                                                }
                                                const config1 = {
                                                    type: 'bar',
                                                    data: data1,
                                                    options: {
                                                        scales: {
                                                            y: {
                                                                beginAtZero: true
                                                            }
                                                        }
                                                    }
                                                };
                                                const myChart1 = new Chart(document.getElementById('myChart1'), config1);
                        */

                        labels = [];
                        var key3 = Object.keys(musc[0].musculoskeletals);
                        var value3 = Object.values(musc[0].musculoskeletals);
                        for (var j = 0; j < key3.length; j++) {
                            labels.push({
                                label: key3[j],
                                y: value3[j]
                            });
                        }
                        var chart = new CanvasJS.Chart("chartContainer3", {
                            background: "#edf1f7",
                            animationEnabled: true,
                            title: {
                                text: "Musculoskeletals"
                            },
                            data: [{
                                type: "pie",
                                startAngle: 240,
                                yValueFormatString: "##0.00\"%\"",
                                indexLabel: "{label} {y}",
                                dataPoints: labels,
                            }]
                        });
                        chart.render();
                        /*
                        // chart4
                        const data = {
                            labels: key3,
                            datasets: [{
                                label: 'Musculoskeletals',
                                data: value3,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                ],
                                borderWidth: 1
                            }]

                        }
                        const config = {
                            type: 'bar',
                            data,
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        };
                        const myChart = new Chart(document.getElementById('myChart'), config);
*/

                        var img = resdata[0].Images;
                        var imagElement = document.getElementById('image');
                        imagElement.setAttribute('src', img);


                    }
                });
            }
        }
    })
}