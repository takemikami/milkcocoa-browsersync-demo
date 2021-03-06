(function(){
	var html = '<div class="chatparts-header"><p class="chatparts-title">みんなでチャット</p><a id="spc-close" class="chatparts-close">-</a></div><div id="spc-message-area" class="chatparts-messages"><div id="spc-messages"></div></div><input id="spc-content" class="chatparts-textbox" type="text" placeholder="Enterで投稿"></input>';
	function escapeHTML(str) {return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}
	window.chatpart = {
        start : function(_option) {
            var option = _option || {};
            var host = option.host || "https://io-ehz546bne.mlkcca.com";
            var datastore = option.datastore || "messages";
            var ele = document.createElement("div");
            ele.innerHTML = html;
            ele.className = "chatparts";
            document.body.appendChild(ele);
            var milkcocoa = new MilkCocoa(host);
            var ds = milkcocoa.dataStore(datastore);
            ds.query({}).done(function(e) {
                for(var i=0;i < e.length;i++) {
                    if(!e[i].content) continue;
                    $("#spc-messages").append('<div id="'+e[i].id+'">' + escapeHTML(e[i].content) + "</div>");
                }
                scroll_to_bottom();
            });
            ds.on("push", function(e) {
                $("#spc-messages").append('<div id="'+e.id+'">' + escapeHTML(e.value.content) + "</div>");
                scroll_to_bottom();
            });
            function scroll_to_bottom() {
                var message_area = document.getElementById("spc-message-area");
                message_area.scrollTop = message_area.scrollHeight;
            }
            $('#spc-content').keydown(function (e) {
                if (e.which == 13){
                    ds.push({
                        content : escapeHTML($("#spc-content").val())
                    });
                    $("#spc-content").val("");
                    return false;
                }
            });
            var close_ele = document.getElementById("spc-close");
            var mode = "open";
            close_ele.onclick = function() {
                var message_area_ele = document.getElementById("spc-message-area");
                if(mode == "open") {
                    message_area_ele.className = "chatparts-messages-min";
                    close_ele.innerHTML = "+";
                    mode = "close";
                }else{
                    message_area_ele.className = "chatparts-messages";
                    close_ele.innerHTML = "-";
                    mode = "open";
                }
            }
            
        }
    }
}())