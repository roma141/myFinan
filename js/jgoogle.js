function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    // Now safe to use device APIs
    window.ga.startTrackerWithId('UA-81270544-2');
	window.ga.trackView('Screen Title');
	// window.ga.trackView(String(document.title));
	// window.ga.setAppVersion('1.0.1');
}
function leeServidor()
{
 	ayuda = "http://wiki.gtienda.com";
 	onLoad();
 	if (typeof servidor == 'undefined' || servidor=="" || servidor==null)
 		// servidor = "192.168.1.100:8084";
 		// servidor = "localhost:8084";
 		// servidor = "192.168.2.109:8084";
		servidor = "botpi.com:8084";
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-81270544-1', 'auto');
ga('send', 'pageview');
