/*!
* CSSViewer, A Mozilla Firefox Web Extension for fellow web developers, web designers, and hobbyists.
* https://github.com/mohsenkhanpour/CSSViewer
* 
*
* This source code is licensed under the Mozilla Public License,
* Version 2.0.
* Mohsen Khanpour, 2018
*/

var cssViewerLoaded              = false; 
var cssCiewerContextMenusParent  = null;

// Check whether new version is installed
browser.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install" || details.reason == "update" ){
		browser.tabs.create( {url: "option.html"} );
	}
});

/*
* Inject cssviewer.js/cssviewer.css into the current page
*/
browser.browserAction.onClicked.addListener(function(tab)
{
	if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 )
	{
		alert( "CSSViewer doesn't work on Google Chrome webstore!" );

		return;
	}

	if( ! cssViewerLoaded ) 
	{
		cssCiewerContextMenusParent  = browser.contextMenus.create( { "title" : "CSSViewer console", contexts:["all"] } );

		browser.contextMenus.create( { "title": "element"                    , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugEl } );
		browser.contextMenus.create( { "title": "element.id"                 , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElId } );
		browser.contextMenus.create( { "title": "element.tagName"            , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElTagName } );
		browser.contextMenus.create( { "title": "element.className"          , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElClassName } );
		browser.contextMenus.create( { "title": "element.style"              , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElStyle } );
		browser.contextMenus.create( { "title": "element.cssText"            , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElCssText } );
		browser.contextMenus.create( { "title": "element.getComputedStyle"   , contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElGetComputedStyle } );
		browser.contextMenus.create( { "title": "element.simpleCssDefinition", contexts:["all"] , "parentId": cssCiewerContextMenusParent, "onclick": cssCiewerDebugElSimpleCssDefinition } );
	}

	browser.tabs.executeScript(tab.id, {file:'js/cssviewer.js'});
	browser.tabs.insertCSS(tab.id, {file:'css/cssviewer.css'});

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
