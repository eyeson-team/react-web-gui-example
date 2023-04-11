(this["webpackJsonpeyeson-web-gui-react"]=this["webpackJsonpeyeson-web-gui-react"]||[]).push([[0],{188:function(e,t,n){},242:function(e,t,n){"use strict";n.r(t);var a=n(7),i=n.n(a),o=(n(119),n(188),n(20)),r=n(22),c=n(23),s=n(21),l=n(8),d=n.n(l),u=n(0),h=n(105),j=n(104),m=n(260),v=Object(m.b)(),b=n.p+"static/media/eyeson-logo.844747c0.svg",g=n(32),p=n(15),f=n(3),O=function(e){var t=e.title;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(g.a,{fixed:!0,children:Object(f.jsxs)(g.c,{children:[Object(f.jsxs)(g.d,{alignStart:!0,children:[Object(f.jsx)("img",{src:b,height:"32",alt:"eyeson Logo",className:"toolbar-logo"}),Object(f.jsx)(g.e,{children:t})]}),Object(f.jsxs)(g.d,{alignEnd:!0,children:[Object(f.jsx)(p.a,{tag:"a",target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/eyeson_team",unelevated:!0,children:"Twitter"}),Object(f.jsx)(p.a,{tag:"a",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/eyeson-team",unelevated:!0,children:"GitHub"})]})]})}),Object(f.jsx)(g.b,{})]})},x=n(31),y=n(51),S=n(39),C=n(53),M=n(103),k=function(e,t){try{var n=e["get".concat(t,"Tracks")]();if(n.length>0)return n[0].getSettings().deviceId}catch(a){console.error(a)}return""},P=function(e){return{value:e.deviceId,label:e.label}},w=function(e){var t=Object(u.useState)(function(e){return location.search.substring(1).split("&").find((function(t){return t.length===e&&!t.includes("=")}))||""}(24)),n=Object(x.a)(t,2),a=n[0],i=n[1];return Object(f.jsx)(y.a,{id:"start",className:"page",children:Object(f.jsxs)("form",{onSubmit:function(t){t.preventDefault(),24===a.length?e.onStart(a):v.notify({body:"Invalid access key",icon:"warning"})},children:[Object(f.jsxs)(C.a,{alignEnd:!0,children:[Object(f.jsx)("label",{htmlFor:"input-token",children:"Meeting Access Key"}),Object(f.jsx)(M.a,{id:"input-token",value:a,placeholder:"rQIKmLQF6jDQUkJw6AFKJELY",onChange:function(e){var t=e.target;return i(t.value.trim())},style:{width:"20rem"},autoFocus:!0})]}),Object(f.jsx)(S.a,{use:"body1",tag:"p",children:"Get an user access key from starting a meeting via the API or use one from an active meeting."}),Object(f.jsx)("div",{className:"buttons",children:Object(f.jsx)(p.a,{label:"Start",type:"submit",unelevated:!0,disabled:e.loading})})]})})},A=n(259),E=n(75),V=function(){return console.log("unable to play video")},D=function(e){return new Promise((function(t){return setTimeout(t,e)}))},_=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).initVideo=function(e){e&&e!==a.video&&(a.video=e)},a.playPromise=Promise.resolve(),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this.video,t=this.props.stream;t&&e&&!e.srcObject&&(this.playPromise=this.playPromise.then((function(){return e.srcObject=t,Promise.race([e.play().catch(V),D(150)])})))}},{key:"componentDidUpdate",value:function(e){var t=this.video,n=this.props.stream;!n||!t||t.srcObject&&e.stream===n||(this.playPromise=this.playPromise.then((function(){return t.srcObject=n,Promise.race([t.play().catch(V),D(150)])})))}},{key:"componentWillUnmount",value:function(){var e=this.video;this.video=null,e&&(e.srcObject=null)}},{key:"render",value:function(){return Object(f.jsx)("video",{className:"video",ref:this.initVideo,muted:this.props.muted,playsInline:!0})}}]),n}(u.Component),I=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.cameras,n=e.microphones,i=e.stream,o=e.error,r=a.state,c=r.selectedMicrophone,s=r.selectedCamera;t&&n&&a.setState({cameras:t.map(P),microphones:n.map(P)}),i&&a.setState({stream:i,selectedCamera:k(i,"Video"),selectedMicrophone:k(i,"Audio")}),n&&c&&!n.find((function(e){return e.deviceId===c}))&&n.length>0&&a.onMicChange({target:{value:n[0].deviceId}}),t&&s&&!t.find((function(e){return e.deviceId===s}))&&t.length>0&&a.onCamChange({target:{value:t[0].deviceId}}),o&&v.notify({title:o instanceof Error?o.message:o,icon:"error"})},a.toggleAudio=function(e){var t=e.target.checked;a.setState({enabledAudio:t}),a.deviceManager.updateWithOptions({audio:t,video:a.state.enabledVideo})},a.toggleVideo=function(e){var t=e.target.checked;a.setState({enabledVideo:t}),a.deviceManager.updateWithOptions({audio:a.state.enabledAudio,video:t})},a.onMicChange=function(e){var t=e.target.value;a.setState({selectedMicrophone:t}),a.deviceManager.setAudioInput(t),a.deviceManager.storeConstraints()},a.onCamChange=function(e){var t=e.target.value;a.setState({selectedCamera:t}),a.deviceManager.setVideoInput(t),a.deviceManager.storeConstraints()},a.onJoin=function(){var e=a.state,t=e.enabledAudio,n=e.enabledVideo;a.deviceManager.storeConstraints(),a.props.onJoin({audio:t,video:n})},a.onExit=function(){a.props.exitMeeting()},a.state={stream:null,cameras:[],microphones:[],selectedCamera:"",selectedMicrophone:"",enabledAudio:!0,enabledVideo:!0},a.deviceManager=new l.DeviceManager,a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.deviceManager.onChange(this.handleChange),this.deviceManager.start()}},{key:"componentWillUnmount",value:function(){this.deviceManager.terminate()}},{key:"render",value:function(){var e=this.state,t=e.stream,n=e.enabledAudio,a=e.enabledVideo,i=e.microphones,o=e.cameras,r=e.selectedMicrophone,c=e.selectedCamera;return Object(f.jsxs)(y.a,{id:"preview",className:"page",children:[Object(f.jsx)(S.a,{use:"headline4",tag:"h4",className:"page-title",children:"Preview"}),Object(f.jsx)("div",{children:a&&Object(f.jsx)(_,{stream:t,muted:!0})}),Object(f.jsxs)("div",{className:"device",children:[Object(f.jsxs)("div",{className:"field",children:[Object(f.jsx)(S.a,{use:"caption",className:"title",children:"Microphone"}),Object(f.jsx)(E.a,{checked:n,onChange:this.toggleAudio})]}),Object(f.jsx)(A.a,{options:i,onChange:this.onMicChange,value:r,disabled:!n})]}),Object(f.jsxs)("div",{className:"device",children:[Object(f.jsxs)("div",{className:"field",children:[Object(f.jsx)(S.a,{use:"caption",className:"title",children:"Camera"}),Object(f.jsx)(E.a,{checked:a,onChange:this.toggleVideo})]}),Object(f.jsx)(A.a,{options:o,onChange:this.onCamChange,value:c,disabled:!a})]}),Object(f.jsxs)("div",{className:"buttons",children:[Object(f.jsx)(p.a,{label:"Cancel",outlined:!0,onClick:this.onExit}),"\xa0",Object(f.jsx)(p.a,{label:"Join",unelevated:!0,onClick:this.onJoin})]})]})}}]),n}(u.Component),N=n(57),J=n(40),L=n(17),W=function(){return console.log("unable to play audio")},T=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).initAudio=function(e){e&&e!==a.audio&&(a.audio=e)},a.playPromise=Promise.resolve(),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this.audio,t=this.props.stream;t&&e&&!e.srcObject&&(this.playPromise=this.playPromise.then((function(){return e.srcObject=t,e.play().catch(W)})))}},{key:"componentDidUpdate",value:function(e){var t=this.audio,n=this.props.stream;!n||!t||t.srcObject&&e.stream===n||(this.playPromise=this.playPromise.then((function(){return t.srcObject=n,t.play().catch(W)})))}},{key:"componentWillUnmount",value:function(){var e=this.audio;this.audio=null,e&&(e.srcObject=null)}},{key:"render",value:function(){return Object(f.jsx)("audio",{ref:this.initAudio})}}]),n}(u.Component),U=n(261),F=function(e){var t=e.open,n=e.onClose,a=Object(u.useRef)(),i=Object(u.useRef)(),o=Object(u.useState)([]),r=Object(x.a)(o,2),c=r[0],s=r[1],d=Object(u.useState)([]),h=Object(x.a)(d,2),j=h[0],m=h[1],v=Object(u.useState)(),b=Object(x.a)(v,2),g=b[0],p=b[1],O=Object(u.useState)(),y=Object(x.a)(O,2),S=y[0],C=y[1];return Object(u.useEffect)((function(){var e=function(e){var t=e.error,n=e.stream,a=e.microphones,o=e.cameras;if(console.debug(e),t)console.error(t);else if(a&&m(a.map(P)),o&&s(o.map(P)),n){var r=k(n,"Audio"),c=k(n,"Video");i.current.srcObject=e.stream,p(r),C(c)}};t?(a.current=new l.DeviceManager,a.current.onChange(e),a.current.start()):a.current&&(a.current.removeListener(e),a.current.stop(),a.current=null,i.current.srcObject=null)}),[t]),Object(f.jsxs)(U.a,{id:"dialog-settings",open:t,onClose:function(e){var t=!1;"apply"===e.detail.action&&(a.current.storeConstraints(),t=!0),n(t)},children:[Object(f.jsx)(U.e,{children:"Devices"}),Object(f.jsxs)(U.d,{children:[Object(f.jsx)("video",{ref:i,playsInline:!0,autoPlay:!0,muted:!0}),Object(f.jsx)(A.a,{label:"Microphone",value:g,options:j,onChange:function(e){var t=e.currentTarget.value;a.current&&t&&(p(t),a.current.setAudioInput(t))}}),Object(f.jsx)(A.a,{label:"Camera",value:S,options:c,onChange:function(e){var t=e.currentTarget.value;a.current&&t&&(C(t),a.current.setVideoInput(t))}})]}),Object(f.jsxs)(U.b,{children:[Object(f.jsx)(U.c,{outlined:!0,action:"close",children:"Cancel"}),Object(f.jsx)(U.c,{unelevated:!0,action:"apply",isDefaultAction:!0,children:"Apply"})]})]})},G=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(e){var a;Object(o.a)(this,n),(a=t.call(this,e)).handleEvent=function(e){var t=e.type;console.debug(t,e),"presentation_ended"===t?(d.a.send({type:"start_stream",audio:a.state.audio,video:a.state.video}),a.setState({screen:!1})):"accept"===t?(a.setState({localStream:e.localStream,remoteStream:e.remoteStream}),a.props.setLoading(!1)):"stream_update"===t?(e.localStream&&a.setState({localStream:e.localStream}),e.stream&&a.setState({remoteStream:e.stream})):"podium"===t?a.setState({solo:e.solo,hasPresenter:e.hasPresenter,hasMutedVideoPeers:e.hasMutedVideoPeers}):"remote_description_update"===t?a.setState({sfuMode:e.update.sfu}):"warning"===t?v.notify({title:"Warning: ".concat(e.name),icon:"warning"}):"error"===t?(v.notify({title:"Error: ".concat(e.name),icon:"error"}),a.endSession()):"exit"===t?(v.notify({title:"Meeting has ended"}),a.endSession()):console.debug("[App]","Ignore received event:",e.type)},a.toggleAudio=function(){var e=a.state,t=e.audio,n=e.localStream,i=!t;l.StreamHelpers.toggleAudio(n,i),a.setState({audio:i})},a.toggleVideo=function(){var e=a.state,t=e.audio,n=e.video,i=e.localStream,o=!n;d.a.send({type:"change_stream",stream:i,video:o,audio:t}),a.setState({video:o})},a.toggleScreen=function(){a.state.screen?d.a.send({type:"stop_presenting"}):(d.a.send({type:"start_screen_capture",audio:a.state.audio,screenStream:null,screen:!0}),a.setState({screen:!0}))},a.showSettings=function(){a.setState({settingsDialog:!0})},a.closeSettings=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];a.setState({settingsDialog:!1}),e&&!a.state.screen&&d.a.send({type:"start_stream",audio:a.state.audio,video:a.state.video})},a.endSession=function(){a.props.exitMeeting()};var i=e.mediaOptions;return a.state={localStream:null,remoteStream:null,audio:i.audio,video:i.video,screen:!1,settingsDialog:!1,sfuMode:!1,solo:!0,hasPresenter:!1,hasMutedVideoPeers:!1},a.canScreenCapture=l.FeatureDetector.canScreenCapture(),a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this.state,t=e.audio,n=e.video;this.props.setLoading(!0),d.a.onEvent(this.handleEvent),d.a.join({audio:t,video:n})}},{key:"componentWillUnmount",value:function(){d.a.offEvent(this.handleEvent),this.setState({localStream:null,remoteStream:null})}},{key:"renderMainView",value:function(){var e=this.state,t=e.remoteStream,n=e.localStream,a=e.video,i=e.sfuMode,o=e.solo,r=e.hasMutedVideoPeers;return[{condition:function(){return o&&a},component:function(){return Object(f.jsx)(_,{stream:n,muted:!0})}},{condition:function(){return i&&r},component:function(){return Object(f.jsx)("div",{className:"empty-video-container",children:Object(f.jsx)("div",{className:"video empty",children:Object(f.jsx)(T,{stream:t})})})}},{condition:function(){return!0},component:function(){return Object(f.jsx)(_,{stream:t})}}].find((function(e){return e.condition()})).component()}},{key:"render",value:function(){var e=this.state,t=e.localStream,n=e.audio,a=e.video,i=e.screen,o=e.sfuMode,r=e.solo,c=e.hasPresenter,s=e.settingsDialog,l=a&&o&&!r&&!c;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(N.a,{children:[Object(f.jsxs)(N.b,{span:"11",children:[this.renderMainView(),l&&Object(f.jsx)("div",{id:"self-view",children:Object(f.jsx)(_,{stream:t,muted:!0})})]}),Object(f.jsxs)(N.b,{span:"1",className:"app-sidebar",children:[Object(f.jsx)(J.a,{content:n?"Mute":"Unmute",align:"left",children:Object(f.jsx)(L.a,{checked:n,onClick:this.toggleAudio,label:"Toggle audio",icon:n?"mic":"mic_off"})}),Object(f.jsx)(J.a,{content:a?"Turn off camera":"Turn on camera",align:"left",children:Object(f.jsx)(L.a,{checked:a,disabled:i,onClick:this.toggleVideo,label:"Toggle video",icon:a?"videocam":"videocam_off"})}),Object(f.jsx)(J.a,{content:i?"Stop screenshare":"Start screenshare",align:"left",children:Object(f.jsx)(L.a,{disabled:!1===this.canScreenCapture,checked:i,onClick:this.toggleScreen,label:"Share screen",icon:i?"stop_screen_share":"screen_share"})}),Object(f.jsx)(J.a,{content:"Device settings",align:"left",children:Object(f.jsx)(L.a,{disabled:i,onClick:this.showSettings,label:"Device settings",icon:"settings"})}),Object(f.jsx)(J.a,{content:"Leave Meeting",align:"left",children:Object(f.jsx)(L.a,{onClick:this.endSession,label:"Leave Meeting",icon:"logout"})})]})]}),Object(f.jsx)(F,{open:s,onClose:this.closeSettings})]})}}]),n}(u.Component),K=G,Q=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleEvent=function(e){var t=e.type,n=e.connectionStatus;"connection"===t&&(["initialize","fetch_room","received_room","ready"].includes(n)?"ready"===n&&a.setState({loading:!1,connected:!0}):a.setState({loading:!1},(function(){v.notify({title:n,icon:"error"})})))},a.onStart=function(e){a.setState({loading:!0}),d.a.connect(e)},a.onJoin=function(e){a.setState({mediaOptions:e,inPreview:!1})},a.exitMeeting=function(){d.a.destroy(),d.a.onEvent(a.handleEvent),a.setState({loading:!1,connected:!1,inPreview:!0})},a.setLoading=function(e){a.setState({loading:e})},a.state={loading:!1,connected:!1,inPreview:!0,mediaOptions:{audio:!0,video:!0}},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){d.a.onEvent(this.handleEvent)}},{key:"renderContent",value:function(){var e=this;return[{condition:function(){return e.state.inPreview&&!e.state.connected},component:function(){return Object(f.jsx)(w,{onStart:e.onStart,loading:e.state.loading})}},{condition:function(){return e.state.inPreview},component:function(){return Object(f.jsx)(I,{onJoin:e.onJoin,exitMeeting:e.exitMeeting})}},{condition:function(){return!0},component:function(){return d.a.offEvent(e.handleEvent),Object(f.jsx)(K,{exitMeeting:e.exitMeeting,setLoading:e.setLoading,mediaOptions:e.state.mediaOptions})}}].find((function(e){return e.condition()})).component()}},{key:"render",value:function(){return Object(f.jsxs)(h.a,{options:{primary:"#9e206c",secondary:"#6d6d6d"},children:[Object(f.jsx)(O,{title:"Web GUI React App"}),Object(f.jsx)(j.a,{closed:!this.state.loading}),Object(f.jsx)("main",{id:"app",children:this.renderContent()}),Object(f.jsx)(m.a,{messages:v.messages})]})}}]),n}(u.Component);i.a.render(Object(f.jsx)(Q,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[242,1,2]]]);
//# sourceMappingURL=main.6e691f81.chunk.js.map