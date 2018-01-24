var buf = {};
var ids = ["mouseX", "mouseY", "scrollTop"];
for (var id of ids) {
    buf[id] = [];
}

var mouseX = 0;
var mouseY = 0;
var scrollTop = 0;

document.onmousemove = function(e) {
    var event = e || window.event;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

window.onscroll = function() {
    var dashboard = document.getElementsByClassName("dashboard")[0];
    scrollTop = dashboard.scrollTop;
    console.log(scrollTop);
}

function getBehavior() {
    var timestamp = (new Date()).getTime()
    buf[ids[0]].push({x: timestamp, y: mouseX});
    buf[ids[1]].push({x: timestamp, y: mouseY});
    buf[ids[2]].push({x: timestamp, y: scrollTop});
}

window.onload = function() {
    setInterval(getBehavior, 100);
    for (var id of ids) {
        var ctx = document.getElementById(id).getContext("2d");
        var chart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    data: [],
                    label: id,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    fill: false,
                    lineTension: 0
                }]
            },
            options: {
                title: {
                    text: id,
                    display: true
                },
                scales: {
                    xAxes: [{
                        type: "realtime"
                    }]
                },
                tooltips: {
                    enabled: false
                },
                plugins: {
                    streaming: {
                        duration: 30000, // 30s間のデータを表示
                        refresh: 100, // 0.1sごとに更新
                        onRefresh: function(chart) {
                            Array.prototype.push.apply(
                                chart.data.datasets[0].data,
                                buf[chart.canvas.id]
                            );
                            buf[chart.canvas.id] = [];
                        }
                    }
                }
            }
        });
    }
}