(()=>{function e(e,t,o,a){const r="380df902b60bf5f0e2efb56a968afeb0",i=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${r}&units=metric&lang=en`;apiRequestCity=`https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${r}&units=metric&lang=en`,apiRequestZip=`https://api.openweathermap.org/data/2.5/weather?zip=${a},BY&appid=${r}&units=metric&lang=en`,o?fetch(apiRequestCity).then((e=>e.json())).then((e=>{n(e)})):fetch(i).then((e=>e.json())).then((e=>{n(e)}))}function t(){fetch("https://api.ipstack.com/check?access_key=938a30f211aaaa7f7f13677d50a26ba7").then((e=>e.json())).then((t=>{e(0,0,t.city,t.zip)}))}function n(e){let t=document.querySelector(".region h1"),n=document.createElement("span"),o=document.querySelector(".day-time"),a=document.querySelector(".date"),r=document.querySelector(".temperature-description"),i=document.querySelector(".temperature"),u=document.querySelector(".icon img"),c=document.querySelector(".wind-speed"),d=document.querySelector(".feeling"),s=document.querySelector(".humidity");u.setAttribute("src",`https://openweathermap.org/img/wn/${e.weather[0].icon}@4x.png`);const p=e.main.temp,m=e.weather[0].description;t.textContent=e.name+", "+e.sys.country;let l=new Date;function y(e){return e<10?"0"+e:e}a.textContent=`${["January","February","March","April","May","June","July","August","September","October","November","December"][l.getMonth()]}, ${l.getDate()}`,o.textContent=`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][l.getDay()]}, ${y(l.getHours())}:${y(l.getMinutes())}`;let h=e.timezone/3600;n.textContent=h>0?" UTC+"+h:" UTC"+h,t.after(n),i.textContent=`${Math.round(10*p)/10} ${String.fromCharCode(176)}C`,r.textContent=m,c.textContent=Math.round(10*e.wind.speed)/10+" m/s",d.textContent=`${Math.round(10*e.main.feels_like)/10} ${String.fromCharCode(176)}C`,s.textContent=e.main.humidity+" %",function(){let e=document.querySelector(".weather-block"),t=document.querySelector(".loader");setTimeout((()=>{t.style.display="none",e.style.display="grid",setTimeout((()=>{e.style.opacity=1}),50)}),800)}()}window.addEventListener("load",(()=>{let n,o;navigator.geolocation?navigator.geolocation.getCurrentPosition((t=>{n=t.coords.longitude,o=t.coords.latitude,e(o,n)}),(e=>{console.error(e.message),t()})):t()}))})();