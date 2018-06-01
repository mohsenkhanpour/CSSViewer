/*!
* CSSViewer, A Google Chrome Extension for fellow web developers, web designers, and hobbyists.
*
* https://github.com/miled/cssviewer
* https://chrome.google.com/webstore/detail/cssviewer/ggfgijbpiheegefliciemofobhmofgce
*
* This source code is licensed under the GNU General Public License,
* Version 2. See the file COPYING for more details.
*/

var cssViewerLoaded              = false; 
var cssCiewerContextMenusParent  = null;

// Check whether new version is installed
browser.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install" || details.reason == "update" ){
		chrome.tabs.create( {url: "option.html"} );
	}
});

/*
* Inject cssviewer.js/cssviewer.css into the current page
*/
chrome.browserAction.onClicked.addListener(function(tab)
{
	if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 )
	{
		alert( "CSSViewer doesn't work on Google Chrome webstore!" );

		return;
	}

	if( ! cssViewerLoaded ) 
	{
		cssCiewerContextMenusParent  = browser.menus.create( { "title" : "CSSViewer console", contexts:["all"] } );

		browser.menus.create( { "title": "element"                    , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugEl } );
		browser.menus.create( { "title": "element.id"                 , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElId } );
		browser.menus.create( { "title": "element.tagName"            , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElTagName } );
		browser.menus.create( { "title": "element.className"          , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElClassName } );
		browser.menus.create( { "title": "element.style"              , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElStyle } );
		browser.menus.create( { "title": "element.cssText"            , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElCssText } );
		browser.menus.create( { "title": "element.getComputedStyle"   , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElGetComputedStyle } );
		browser.menus.create( { "title": "element.simpleCssDefinition", contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElSimpleCssDefinition } );
	}

	browser.tabs.executeScript(tab.id, {file:'js/cssviewer.js'});
	chrome.tabs.insertCSS(tab.id, {file:'css/cssviewer.css'});

	cssViewerLoaded = true;
});

function cssCiewerDebugEl( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("el")'});
}

function cssCiewerDebugElId( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("id")'});
}

function cssCiewerDebugElTagName( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("tagName")'});
}

function cssCiewerDebugElClassName( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("className")'});
}

function cssCiewerDebugElStyle( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("style")'});
}

function cssCiewerDebugElCssText( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("cssText")'});
}
 
function cssCiewerDebugElGetComputedStyle( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("getComputedStyle")'});
}

function cssCiewerDebugElSimpleCssDefinition( info, tab )
{
	browser.tabs.executeScript(tab.id, {code:'cssViewerCopyCssToConsole("simpleCssDefinition")'});
}
