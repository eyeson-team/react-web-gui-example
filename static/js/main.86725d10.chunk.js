(this["webpackJsonpeyeson-web-gui-react"]=this["webpackJsonpeyeson-web-gui-react"]||[]).push([[0],{184:function(e,t,n){},230:function(e,t,n){"use strict";n.r(t);var a=n(7),i=n.n(a),o=(n(115),n(184),n(23)),s=n(24),c=n(27),r=n(26),l=n(9),d=n.n(l),u=n(0),j=n(101),h=n(100),g=n(248),v=Object(g.b)(),b=n.p+"static/media/eyeson-logo.844747c0.svg",m=n(31),p=n(15),f=n(3),O=function(e){var t=e.title;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(m.a,{fixed:!0,children:Object(f.jsxs)(m.c,{children:[Object(f.jsxs)(m.d,{alignStart:!0,children:[Object(f.jsx)("img",{src:b,height:"32",alt:"eyeson Logo",className:"toolbar-logo"}),Object(f.jsx)(m.e,{children:t})]}),Object(f.jsxs)(m.d,{alignEnd:!0,children:[Object(f.jsx)(p.a,{tag:"a",target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/eyeson_team",unelevated:!0,children:"Twitter"}),Object(f.jsx)(p.a,{tag:"a",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/eyeson-team",unelevated:!0,children:"GitHub"})]})]})}),Object(f.jsx)(m.b,{})]})},x=n(30),S=n(50),y=n(38),C=n(52),M=n(99),k=function(e,t){try{var n=e["get".concat(t,"Tracks")]();if(n.length>0)return n[0].getSettings().deviceId}catch(a){console.error(a)}return""},w=function(e){return{value:e.deviceId,label:e.label}},A=function(e){var t=Object(u.useState)(function(e){return location.search.substring(1).split("&").find((function(t){return t.length===e&&!t.includes("=")}))||""}(24)),n=Object(x.a)(t,2),a=n[0],i=n[1];return Object(f.jsx)(S.a,{id:"start",className:"page",children:Object(f.jsxs)("form",{onSubmit:function(t){t.preventDefault(),24===a.length?e.onStart(a):v.notify({body:"Invalid access key",icon:"warning"})},children:[Object(f.jsxs)(C.a,{alignEnd:!0,children:[Object(f.jsx)("label",{htmlFor:"input-token",children:"Meeting Access Key"}),Object(f.jsx)(M.a,{id:"input-token",value:a,placeholder:"rQIKmLQF6jDQUkJw6AFKJELY",onChange:function(e){var t=e.target;return i(t.value.trim())},style:{width:"20rem"},autoFocus:!0})]}),Object(f.jsx)(y.a,{use:"body1",tag:"p",children:"Get an user access key from starting a meeting via the API or use one from an active meeting."}),Object(f.jsx)("div",{className:"buttons",children:Object(f.jsx)(p.a,{label:"Start",type:"submit",unelevated:!0,disabled:e.loading})})]})})},E=n(247),_=n(74),I=function(e){return e.play().catch((function(){return console.log("unable to play video")}))},P=function(e){Object(c.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).initVideo=function(e){e&&(a.video=e)},a.playPromise=Promise.resolve(),a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this.video,t=this.props.stream;t&&e&&!e.srcObject&&(e.srcObject=t,this.playPromise=this.playPromise.then(I(e)))}},{key:"componentDidUpdate",value:function(e){var t=this.video,n=this.props.stream;!n||!t||t.srcObject&&e.stream===n||(t.srcObject=n,this.playPromise=this.playPromise.then(I(t)))}},{key:"componentWillUnmount",value:function(){var e=this.video;this.video=null,e&&(e.srcObject=null)}},{key:"render",value:function(){return Object(f.jsx)("video",{className:"video",ref:this.initVideo,muted:this.props.muted,playsInline:!0})}}]),n}(u.Component),D=function(e){Object(c.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.cameras,n=e.microphones,i=e.stream,o=e.error,s=a.state,c=s.selectedMicrophone,r=s.selectedCamera;t&&n&&a.setState({cameras:t.map(w),microphones:n.map(w)}),i&&a.setState({stream:i,selectedCamera:k(i,"Video"),selectedMicrophone:k(i,"Audio")}),n&&c&&!n.find((function(e){return e.deviceId===c}))&&n.length>0&&a.onMicChange({target:{value:n[0].deviceId}}),t&&r&&!t.find((function(e){return e.deviceId===r}))&&t.length>0&&a.onCamChange({target:{value:t[0].deviceId}}),o&&v.notify({title:o instanceof Error?o.message:o,icon:"error"})},a.toggleAudio=function(e){var t=e.target.checked;a.setState({enabledAudio:t}),a.deviceManager.updateWithOptions({audio:t,video:a.state.enabledVideo})},a.toggleVideo=function(e){var t=e.target.checked;a.setState({enabledVideo:t}),a.deviceManager.updateWithOptions({audio:a.state.enabledAudio,video:t})},a.onMicChange=function(e){var t=e.target.value;a.setState({selectedMicrophone:t}),a.deviceManager.setAudioInput(t),a.deviceManager.storeConstraints()},a.onCamChange=function(e){var t=e.target.value;a.setState({selectedCamera:t}),a.deviceManager.setVideoInput(t),a.deviceManager.storeConstraints()},a.onJoin=function(){var e=a.state,t=e.enabledAudio,n=e.enabledVideo;a.deviceManager.storeConstraints(),a.props.onJoin({audio:t,video:n})},a.onExit=function(){a.props.exitMeeting()},a.state={stream:null,cameras:[],microphones:[],selectedCamera:"",selectedMicrophone:"",enabledAudio:!0,enabledVideo:!0},a.deviceManager=new l.DeviceManager,a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.deviceManager.onChange(this.handleChange),this.deviceManager.start()}},{key:"componentWillUnmount",value:function(){this.deviceManager.terminate()}},{key:"render",value:function(){var e=this.state,t=e.stream,n=e.enabledAudio,a=e.enabledVideo,i=e.microphones,o=e.cameras,s=e.selectedMicrophone,c=e.selectedCamera;return Object(f.jsxs)(S.a,{id:"preview",className:"page",children:[Object(f.jsx)(y.a,{use:"headline4",tag:"h4",className:"page-title",children:"Preview"}),Object(f.jsx)("div",{children:a&&Object(f.jsx)(P,{stream:t,muted:!0})}),Object(f.jsxs)("div",{className:"device",children:[Object(f.jsxs)("div",{className:"field",children:[Object(f.jsx)(y.a,{use:"caption",className:"title",children:"Microphone"}),Object(f.jsx)(_.a,{checked:n,onChange:this.toggleAudio})]}),Object(f.jsx)(E.a,{options:i,onChange:this.onMicChange,value:s,disabled:!n})]}),Object(f.jsxs)("div",{className:"device",children:[Object(f.jsxs)("div",{className:"field",children:[Object(f.jsx)(y.a,{use:"caption",className:"title",children:"Camera"}),Object(f.jsx)(_.a,{checked:a,onChange:this.toggleVideo})]}),Object(f.jsx)(E.a,{options:o,onChange:this.onCamChange,value:c,disabled:!a})]}),Object(f.jsxs)("div",{className:"buttons",children:[Object(f.jsx)(p.a,{label:"Cancel",outlined:!0,onClick:this.onExit}),"\xa0",Object(f.jsx)(p.a,{label:"Join",unelevated:!0,onClick:this.onJoin})]})]})}}]),n}(u.Component),V=n(56),N=n(39),J=n(17),L=n(249),W=function(e){var t=e.open,n=e.onClose,a=Object(u.useRef)(),i=Object(u.useRef)(),o=Object(u.useState)([]),s=Object(x.a)(o,2),c=s[0],r=s[1],d=Object(u.useState)([]),j=Object(x.a)(d,2),h=j[0],g=j[1],v=Object(u.useState)(),b=Object(x.a)(v,2),m=b[0],p=b[1],O=Object(u.useState)(),S=Object(x.a)(O,2),y=S[0],C=S[1];return Object(u.useEffect)((function(){var e=function(e){var t=e.error,n=e.stream,a=e.microphones,o=e.cameras;if(console.debug(e),t)console.error(t);else if(a&&g(a.map(w)),o&&r(o.map(w)),n){var s=k(n,"Audio"),c=k(n,"Video");i.current.srcObject=e.stream,p(s),C(c)}};t?(a.current=new l.DeviceManager,a.current.onChange(e),a.current.start()):a.current&&(a.current.removeListener(e),a.current.stop(),a.current=null,i.current.srcObject=null)}),[t]),Object(f.jsxs)(L.a,{id:"dialog-settings",open:t,onClose:function(e){var t=!1;"apply"===e.detail.action&&(a.current.storeConstraints(),t=!0),n(t)},children:[Object(f.jsx)(L.e,{children:"Devices"}),Object(f.jsxs)(L.d,{children:[Object(f.jsx)("video",{ref:i,playsInline:!0,autoPlay:!0,muted:!0}),Object(f.jsx)(E.a,{label:"Microphone",value:m,options:h,onChange:function(e){var t=e.currentTarget.value;a.current&&t&&(p(t),a.current.setAudioInput(t))}}),Object(f.jsx)(E.a,{label:"Camera",value:y,options:c,onChange:function(e){var t=e.currentTarget.value;a.current&&t&&(C(t),a.current.setVideoInput(t))}})]}),Object(f.jsxs)(L.b,{children:[Object(f.jsx)(L.c,{outlined:!0,action:"close",children:"Cancel"}),Object(f.jsx)(L.c,{unelevated:!0,action:"apply",isDefaultAction:!0,children:"Apply"})]})]})},T=function(e){Object(c.a)(n,e);var t=Object(r.a)(n);function n(e){var a;Object(o.a)(this,n),(a=t.call(this,e)).handleEvent=function(e){var t=e.type;console.debug(t,e),"presentation_ended"===t?(d.a.send({type:"start_stream",audio:a.state.audio,video:a.state.video}),a.setState({screen:!1})):"accept"===t?(a.setState({localStream:e.localStream,remoteStream:e.remoteStream}),a.props.setLoading(!1)):"stream_update"===t?(e.localStream&&a.setState({localStream:e.localStream}),e.stream&&a.setState({remoteStream:e.stream})):"podium"===t?a.setState({solo:e.solo,hasPresenter:e.hasPresenter}):"remote_description_update"===t?a.setState({sfuMode:e.update.sfu}):"warning"===t?v.notify({title:"Warning: ".concat(e.name),icon:"warning"}):"error"===t?(v.notify({title:"Error: ".concat(e.name),icon:"error"}),a.endSession()):"exit"===t?(v.notify({title:"Meeting has ended"}),a.endSession()):console.debug("[App]","Ignore received event:",e.type)},a.toggleAudio=function(){var e=a.state,t=e.audio,n=e.localStream,i=!t;l.StreamHelpers.toggleAudio(n,i),a.setState({audio:i})},a.toggleVideo=function(){var e=a.state,t=e.audio,n=e.video,i=e.localStream,o=!n;d.a.send({type:"change_stream",stream:i,video:o,audio:t}),a.setState({video:o})},a.toggleScreen=function(){a.state.screen?d.a.send({type:"stop_presenting"}):(d.a.send({type:"start_screen_capture",audio:a.state.audio,screenStream:null,screen:!0}),a.setState({screen:!0}))},a.showSettings=function(){a.setState({settingsDialog:!0})},a.closeSettings=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];a.setState({settingsDialog:!1}),e&&!a.state.screen&&d.a.send({type:"start_stream",audio:a.state.audio,video:a.state.video})},a.endSession=function(){a.props.exitMeeting()};var i=e.mediaOptions;return a.state={localStream:null,remoteStream:null,audio:i.audio,video:i.video,screen:!1,settingsDialog:!1,sfuMode:!1,solo:!0,hasPresenter:!1},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this.state,t=e.audio,n=e.video;this.props.setLoading(!0),d.a.onEvent(this.handleEvent),d.a.join({audio:t,video:n})}},{key:"componentWillUnmount",value:function(){d.a.offEvent(this.handleEvent),this.setState({localStream:null,remoteStream:null})}},{key:"render",value:function(){var e=this.state,t=e.remoteStream,n=e.localStream,a=e.audio,i=e.video,o=e.screen,s=e.sfuMode,c=e.solo,r=e.hasPresenter,l=e.settingsDialog,d=i&&s&&!c&&!r;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(V.a,{children:[Object(f.jsxs)(V.b,{span:"11",children:[c&&i?Object(f.jsx)(P,{stream:n,muted:!0}):Object(f.jsx)(P,{stream:t}),d&&Object(f.jsx)("div",{id:"self-view",children:Object(f.jsx)(P,{stream:n,muted:!0})})]}),Object(f.jsxs)(V.b,{span:"1",className:"app-sidebar",children:[Object(f.jsx)(N.a,{content:a?"Mute":"Unmute",align:"left",children:Object(f.jsx)(J.a,{checked:a,onClick:this.toggleAudio,label:"Toggle audio",icon:a?"mic":"mic_off"})}),Object(f.jsx)(N.a,{content:i?"Turn off camera":"Turn on camera",align:"left",children:Object(f.jsx)(J.a,{checked:i,disabled:o,onClick:this.toggleVideo,label:"Toggle video",icon:i?"videocam":"videocam_off"})}),Object(f.jsx)(N.a,{content:o?"Stop screenshare":"Start screenshare",align:"left",children:Object(f.jsx)(J.a,{checked:o,onClick:this.toggleScreen,label:"Share screen",icon:o?"stop_screen_share":"screen_share"})}),Object(f.jsx)(N.a,{content:"Device settings",align:"left",children:Object(f.jsx)(J.a,{disabled:o,onClick:this.showSettings,label:"Device settings",icon:"settings"})}),Object(f.jsx)(N.a,{content:"Leave Meeting",align:"left",children:Object(f.jsx)(J.a,{onClick:this.endSession,label:"Leave Meeting",icon:"logout"})})]})]}),Object(f.jsx)(W,{open:l,onClose:this.closeSettings})]})}}]),n}(u.Component),U=T,F=function(e){Object(c.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleEvent=function(e){var t=e.type,n=e.connectionStatus;"connection"===t&&(["initialize","fetch_room","received_room","ready"].includes(n)?"ready"===n&&a.setState({loading:!1,connected:!0}):a.setState({loading:!1},(function(){v.notify({title:n,icon:"error"})})))},a.onStart=function(e){a.setState({loading:!0}),d.a.connect(e)},a.onJoin=function(e){a.setState({mediaOptions:e,inPreview:!1})},a.exitMeeting=function(){d.a.destroy(),d.a.onEvent(a.handleEvent),a.setState({loading:!1,connected:!1,inPreview:!0})},a.setLoading=function(e){a.setState({loading:e})},a.state={loading:!1,connected:!1,inPreview:!0,mediaOptions:{audio:!0,video:!0}},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){d.a.onEvent(this.handleEvent)}},{key:"renderContent",value:function(){var e=this;return[{condition:function(){return e.state.inPreview&&!e.state.connected},component:function(){return Object(f.jsx)(A,{onStart:e.onStart,loading:e.state.loading})}},{condition:function(){return e.state.inPreview},component:function(){return Object(f.jsx)(D,{onJoin:e.onJoin,exitMeeting:e.exitMeeting})}},{condition:function(){return!0},component:function(){return d.a.offEvent(e.handleEvent),Object(f.jsx)(U,{exitMeeting:e.exitMeeting,setLoading:e.setLoading,mediaOptions:e.state.mediaOptions})}}].find((function(e){return e.condition()})).component()}},{key:"render",value:function(){return Object(f.jsxs)(j.a,{options:{primary:"#9e206c",secondary:"#6d6d6d"},children:[Object(f.jsx)(O,{title:"Web GUI React App"}),Object(f.jsx)(h.a,{closed:!this.state.loading}),Object(f.jsx)("main",{id:"app",children:this.renderContent()}),Object(f.jsx)(g.a,{messages:v.messages})]})}}]),n}(u.Component);i.a.render(Object(f.jsx)(F,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[230,1,2]]]);
//# sourceMappingURL=main.86725d10.chunk.js.map