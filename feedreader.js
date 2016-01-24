/**
     * Constructor. Builds an Article object.
     * 
     * String title: The title of the article (from the XML)
     * String desc: A description of the article (from the XML)
     * String link: A link to a source page (from the XML)
     * Date pubDate: A Date object representing the time at which the article was published.
     * String[] thumbnails: An array containing links to image thumbnails.
     */
function Article(title, desc, link, pubDate, thumbnails)
{
    this.title = title; // Save the title
    this.desc = desc; // Save the description
    this.link = link; // Save the article link
    this.pubDate = pubDate; // Save the publication date
    this.thumbnails = thumbnails; // Save the array of thumbnails
    
    /**
     * A method which returns HTML representing this article.
     */
    this.getHTML = function()
    {
        return "<article><img src=\"" + this.thumbnails[0] + "\" /><br /><a href=\"" + this.link + "\"><span class=\"bold\">" + this.title + "</span></a><hr /> + " + this.desc + "</article>";
    }
}

function dispFeed(feedURL)
        {
            $(".clearable").html(); // Clear divs
            
            $.post("feed.php", {fURL: feedURL}, function(data)
                {
                    var feedDoc = $.parseXML(data); // Parse the XML string and create a DOM
                    window.feedDoc = feedDoc;
                    var channel = $("rss channel"); // Get the channel tag
                    window.channel = channel;
                    console.log(channel)
                    
                    /* Get channel info */
                    var channelTitle = $(feedDoc).find("title:first").text(); // Get the channel's title
                    var channelURL = $(feedDoc).find("link:first").text(); // Get the link to the channel's homepage
                    var chanDesc = $(feedDoc).find("description:first").text(); // Get the channel's description
                    var chanLang = $(feedDoc).find("language"); // Channel language
                    var chanImg = $(feedDoc).find("image"); // Channel image, if any
                    var items = $(feedDoc).find("item");
                    console.log("Channel image: %o", chanImg);
                    window.chanInfo = [channelTitle, channelURL, chanDesc, chanLang, chanImg];
                    
                    /* Display channel info */
                    $("#chantit").html("<a href=\"" + channelURL + "\">" + channelTitle + "</a>"); // Display the channel's title and link it to the channel's URL
                    $("#chandesc").html(chanDesc); // Display the channel's description
                    $("#chanlang").html(chanLang); // Display the channel's language
                    $("#chanImg").html("<img src=\"" + $(chanImg).find("url").text() + "\" title=\"" + $(chanImg).find("title").text() + "\" width=\"" + $(chanImg).find("width").text() + "\" height=\"" + $(chanImg).find("height").text() + "\"/>");
                    
                    /* Article variables */
                    var artObjs = []; // Array containing objects representing articles (created by .each below)
                    var curObj; // Current object
                    
                    /* Display articles */
                    $(items).each(function(it) // Loop through items in feed
                        {
                            var curIt = items[it]; // Store a reference to the current item
                            var appStr;
                            
                            /* Check if media elements exist */
                            if ($(curIt).find("media:thumbnail")) // Thumbnail elements exist
                            {
                                appStr = "<img src=\"" + $(curIt).find("media:thumbnail").attr("url") + "\" />"; // Change the string which will be appended to the article
                            }
                            
                            else // No thumbnails
                            {
                                appStr = ""; // Don't append anything
                            }
                            
                            $("#articles").append("<article><a target=\"_blank\" href=\"" + $(curIt).find("link").text() + "\"><span class=\"bold\">" + $(curIt).find("title").text() + "</span></a><hr />" + $(curIt).find("description").text() + appStr + "</article>"); // Add the HTML representing this item to the section
                        }
                    );
                }
            ) // Tell PHP script to fetch the entries from a feed by querying the database
        }
        
$(document).ready(function()
    {
        // Test feed: http://feeds.bbci.co.uk/news/science_and_environment/rss.xml
        
        $("input").keyup(function(e)
            {
                dispFeed($(this).val());
            }
        ).val("http://feeds.bbci.co.uk/news/science_and_environment/rss.xml").trigger("keyup");
    }
);