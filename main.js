var RollingSpider = require("parrot-rolling-spider");
var temporal = require("temporal");

var ACTIVE = true;
var STEPS = 5;
var d = new RollingSpider({uuid:"d03acdcde621"}); //各々書き換えましょう。

d.connect(function () {

  d.setup(function () {
    console.log('Configured for Mambo! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;

      temporal.queue(
        [
          {
            delay: 500,
            task: function() {
              d.takeOff();
              console.log("order take off.");
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3500, // takeOff実行後3500msec経過してから実行
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18); 
              console.log("left turn.")
            }
          },
          {
            delay: 3500, // trun -90度実行後 3500msec後に前進実行 (50cm程度進みます)
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              // この20を小さくすると距離が短くなります。大きくすると長くなります。
              // 大きくする場合は次のtaskのdelay(このtaskではない）を長く設定してください。
              d.drive(param, 20); 
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18);
              console.log("left turn")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18);
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3000,
            task: function() {
              d.land();
              console.log("order landing.");
            }
          },
          {
            delay: 500,
            task: function() {
              d.disconnect();
              console.log('finish.');
              temporal.clear();
              process.exit(0);
              console.log('exit.');
            }
          }
        ]
        );

    }, 1000);

  });
});
