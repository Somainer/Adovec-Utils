# Adovec-Utils

It now contains 4 micro scripts, progress, notify, haishoku and lazyload.

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
let notify = AdovecNotify.of(config);
//config is an Object like:
{
    global: {
        element: null,// Will insert before this element, default: document.body.firstChild
        hoverHeight: 25,
        defaultHeight: 5,
        marginLeft: "37%",
        delim: ["<<", ">>"],//Default: ["{{", "}}"]
        data: {} //This data will be applied to all data object in events.
    },
    events: []//List of events object.
}
//Destroy:
notify.destroy();
```
An Event object will be like:
```JavaScript
{
    date: "<<date>>",//You can also input date, "alwayas", "never" or "else". "else" will be triggered only if no events match.
    color: "<<color>>",
    text: "Happy birthdy, << name >>!",
    aExtend:{// A bar contains <div>, <a>, <span>. <tag>Extend will extend attributes of <tag> element. for <tag> in ["a", "div", "span"]
        href: "https://abu.com/<< name.split(' ').join('-') >>"
    },
    match: ["month", "date"],//Only matches date and month. Default: ["month", "date"]. You can give ["month"] to match month only.
    needsRender: ["date", "color", "text", "aExtend.href"],//Strings that needs to render.
    data: {
        date: "8-17",
        name: "Ezawa Tamiko",
        color: "black"// or #..., RGB(...) etc.
    }
}
```
Schema date:
Available options:

- `always`: Literally, always.
- `never`: Literally, never. // Who the hell will need this???
- `{A date string or Date object}`: Anything that can be constructed by `new Date(date)`.
- `else`: Will be triggered only if no events match.
- `{function}`: A function takes one argument: new Date()

Color: will be applied to CSS attribute: background.

needsRender :array(string) Anything that needs to render. Also can be applied to nested objects.

match :array(string) Date matches fields in this array will be accepted. Default: ["month", "date"]

**Only avaliable when date is a string.**
    
    Example: ["month"] will only checks month.
    It can be any string as long as ("get" + capitalize(match)) is a member(function) of Date object.
    Implementation:
        "month" -> (new Date(date)).getMonth() === (new Date()).getMonth()
        "full year" -> (new Date(date)).getFullYear() === (new Date()).getFullYear()
    So date: "always" can be replaced as match: []

data: Will be the context of template.

Thus, will be rendered as:
```JavaScript
{
    date: "8-17",
    color: "black",
    text: "Happy birthdy, Ezawa Tamiko!",
    aExtend:{
        href: "https://abu.com/Ezawa-Tamiko"
    }
}
```

Events objects can also made by helper:
```JavaScript
AdovecNotify.helper(template, datas);
//Example:
template = {
    date: "<<date>>",//You can also input date, "alwayas", "never" or "else". "else" will be triggered only if no events match.
    color: "<<color>>",
    text: "Happy birthdy, << name >>!",
    aExtend:{// A bar contains <div>, <a>, <span>. <tag>Extend will extend attributes of <tag> element. for <tag> in ["a", "div", "span"]
        href: "https://abu.com/<<link>>"
    },
    needsRender: ["date", "color", "text", "aExtend.href"],//Strings that needs to render.
},
datas = [
    {name: "Ezawa-Tamiko", date:"08-17", link: "Ezawa-Tamiko", color: "black"},
    {name: "Yazawa-Niko", date: "07-22", link: "niko", color: "pink"}
];
```
    About AdovecNotify.utils.render(template, context, delim=["{{", "}}"])

    This function will replace expressions separated by delim, in the scope of context.

## Adovec Haishoku
A tiny color changer, changing color of selected elements based on given image. 
With RGBaster: https://github.com/briangonzalez/rgbaster.js

### Usage

```html
<script src="https://adv-u.roselia.xyz/Adovec-Haishoku/adovec-haishoku.js"></script>
<!-- or use minified file -->
<script src="https://adv-u.roselia.xyz/Adovec-Haishoku/adovec-haishoku.min.js"></script>
<!-- But notice Content-Security-Policy may prevent this script being run. -->
```

```JavaScript
adovecHaishoku.apply(opts)
//Defaults:
{
    image: null,
    exclude: ['rgb(0,0,0)'],
    target: "body",
    changeText: false,
    textColors: {
        light: "#fff",
        dark: "#000"
    },
    text: null
}
```
## Fields:

    image: An <img> element, Haishoku will get the domaint color of this element.

    exclude: array(string) Will ignore colors in this array.

    target: string Will apply the background-color to elements selected by it.

    changeText: boolean Will change text colors according to image if true.

    textColors: {
        light: string,
        dark: string
    } Determine text colors. Will apply light color to text if image is dark.

    text: string (= target if(!text)) Selector of texts.

## Adovec LazyLoad

Literally, a simple image lazy load plugin without any dependences.

### Usage

```html
<script src="https://adv-u.roselia.xyz/Adovec-Lazyload/adovec-lazyload.js"></script>
<!-- or use minified file -->
<script src="https://adv-u.roselia.xyz/Adovec-Lazyload/adovec-lazyload.min.js"></script>
<!-- But notice Content-Security-Policy may prevent this script being run. -->
```

```JavaScript
let lazyload = AdovecLazyLoad.of(options);//or
let lazyload = new AdovecLazyLoad(options);
//Default options:
defaults = {
    load: true,
    placeHolder: "",
    renderPlaceHolder: false,
    changePlaceHolder: true,
    selector: "img",
    delim: ["{{", "}}"],
    prefix: "adovec",
    onscrolledimg: null,
    throttleRate: 200
};
```

### Fields

    load: Determine if doms will be analysed instantly after constructed.

    placeHolder & renderPlaceHolder & changePlaceHolder & delim:

        Image src place holder. Chage the img.src only if changePlaceHolder is true.
        When rendering, will pass the img dom.
        E.g. "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"

        or "https://dummyimage.com/{{ width }}x{{ height }}/000000/651fff.jpg&text={{ alt }}" & renderPlaceHolder = true
    
    selector: CSS selector such as "img" ".lazyload img"

    prefix: field prefix

        When the target image are scrolled into the page, its src will be changed to `${prefix}-src`.

        When setting placeHolder, if `${prefix}-src` is not defined, `${prefix}-src` will be set to original src attribute.

    onscrolledimg: call back function :: [img] => ()

        An array of imgs in the screen will be passed to this function.
        
    throttleRate: minimum scanning threshold(ms). :: Number

### Methods

    lazyload.load() :: () -> () Re-analyse the document with same options.

    lazyload.destroy() :: () -> ()
