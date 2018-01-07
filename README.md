# Adovec-Utils

It now contains 2 micro scripts, progress and notify.

## Adovec Progress

A tiny progress-bar, on the top of window or top of any element you want.

### Usage

```html
<script src="https://adv-u.roselia.xyz/Adovec-Progress/adovec-progress.js"></script>
<!-- or use minified file -->
<script src="https://adv-u.roselia.xyz/Adovec-Progress/adovec-progress.min.js"></script>
<!-- But notice Content-Security-Policy may prevent this script being run. -->
```
Then, use it.
```JavaScript
let bar = AdovecProgress.of(backColor, frontColor);
//or 
let bar = new AdovecProgress(backColor, frontColor);
//Default: backColor: "#b388ff", frontColor: "#7c4dff"
//And you can change the color after by:
bar.setColor(back, front);
//Create Bar element:
bar.createBar(element);
//If element is not defined, it creates before the first element.
//Changing percentage:
bar.addProgress(progress)
bar.setProgress(progress)
//Finish and delete the bar
bar.finish()
//When encounter an error:
bar.abort(frontColor, backColor)
//This changes the bar into another color(default red),stop the progress and stop it.
//Also, if you imported jQuery (if you want, import it after jQuery)
//You can animate it, it will stop at 95%
bar.startAnimate()//Will create element on the top if the element is not created.
//Thus, you can: let bar = AdovecProgress.of(); bar.startAnimate();
//Stop:
bar.stopAnimate();
//Those mehotds can be called by chain.
let bar = AdovecProgress.of().createElement().setProgress();
```

## Adovec Notify
A tiny notify bar with a naive template engine.

### Usage

```html
<script src="https://adv-u.roselia.xyz/Adovec-Notify/adovec-notify.js"></script>
<!-- or use minified file -->
<script src="https://adv-u.roselia.xyz/Adovec-Notify/adovec-notify.min.js"></script>
<!-- But notice Content-Security-Policy may prevent this script being run. -->
```
Then, configure it.
```JavaScript
AdovecNotify.of(config);
//config is a Object like:
{
    global: {
        element: null,
        hoverHeight: 25,
        defaultHeight: 5,
        marginLeft: "37%",
        data: {} //This data will be applied to all data object in events.
    },
    events: []//List of events object.
}
//An Event object will be like:
{
    date: "{{date}}",//You can also input date, "alwayas", "never" or "else". "else" will be triggered only if no events match.
    color: "{{color}}",
    text: "Happy birthdy, {{ name }}!",
    aExtend:{// A bar contains <div>, <a>, <span>. <tag>Extend will extend attributes of <tag> element. for <tag> in ["a", "div", "span"]
        href: "https://abu.com/{{link}}"
    },
    needsRender: ["date", "color", "text", "aExtend.href"],//Strings that needs to render.
    data: {
        date: "8-17",
        name: "Ezawa Tamiko",
        link: "Ezawa-Tamiko",
        color: "black"// or #..., RGB(...) etc.
    }
}
//<=> Will be rendered as:
{
    date: "8-17",
    color: "black",
    text: "Happy birthdy, Ezawa Tamiko!",
    aExtend:{
        href: "https://abu.com/Ezawa-Tamiko"
    }
}
//Events objects can also made by helper:
AdovecNotify.helper(template, datas);
//Example:
template = {
    date: "{{date}}",//You can also input date, "alwayas", "never" or "else". "else" will be triggered only if no events match.
    color: "{{color}}",
    text: "Happy birthdy, {{ name }}!",
    aExtend:{// A bar contains <div>, <a>, <span>. <tag>Extend will extend attributes of <tag> element. for <tag> in ["a", "div", "span"]
        href: "https://abu.com/{{link}}"
    },
    needsRender: ["date", "color", "text", "aExtend.href"],//Strings that needs to render.
},
datas = [
    {name: "Ezawa-Tamiko", date:"08-17", link: "Ezawa-Tamiko", color: "black"},
    {name: "Yazawa-Niko", date: "07-22", link: "niko", color: "pink"}
]
```