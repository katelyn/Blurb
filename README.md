# BlurbJS - Growl-like JS notifications.

### Features 
1. Easy to construct, with sensible defaults. 
2. Create as many notifiers as you like. 
3. Apply your own CSS styles, classes and images.
4. Can display any HTML content.
5. Lots of configuration options.
6. Works in Chrome, Firefox, Opera, Safari, IE.

### Demos
Check out the demos - they are pretty much self explanatory.

### API

#### `User Options`
You can pass a number of options when creating a new Blurb object.

1. **position** : The position of the notifier popup. 
                Available options: 'left-top', 'center-top', 'right-top', 'left-center', 'center-center', 'right-center', 'left-bottom', 'center-bottom', right-bottom', or 
                custom pixel coordinates in the form 'left top'. _Defaults to 'right-top' (as any erroneous input does)._
2. **fadeInDuration** : How fast will the popup fade in, in milliseconds. _Defaults to 200._
3. **fadeOutDuration** : How fast will the popup fade in, in milliseconds. _Defaults to 200._
4. **displayDuration** : How long will the popup stay visible, in milliseconds. Setting this to -1, will leave the popup open until you manually close it. _Defaults to 3000._
5. **cssClass** : A custom CSS class to append to the popup. This will overwrite any default styling unless null or undefined! _Defaults to null._
6. **cssStyle** : A custom CSS style to append (inline) to the popup. This will overwrite any default styling unless null or undefined! _Defaults to some sensible CSS styles :)._
7. **content** : The (default) content of the notification if not passed a message through `show()`. Look at the demos for some code. _Defaults to "This is a nice notification."._
8. **showCloseButton** : Toggles the close button. _Defaults to true._

#### `show()`
Makes the popup visible.

#### `close()`
Closes the popup.

#### `elem()`
Closes the HTML element of the popup.