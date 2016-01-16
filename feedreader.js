function dispFeed(feedURL)
        {
            $.post("feed.php", {fURL: feedURL}, function(data)
                {
                    var feedDoc = $.parseXML(data); // Parse the XML string and create a DOM
                    var nRSS = 1; // # of <rss> tags (Debugging)
                    var nCh = 1; // # of <channel> tags (debugging)
                    var channel = $("rss channel"); // Get the channel tag
                    console.log(channel)
                    
                    /* Get channel info */
                    var channelTitle = $(feedDoc).find("title:first").text(); // Get the channel's title
                    var channelURL = $(feedDoc).find("link:first").text(); // Get the link to the channel's homepage
                    var chanDesc = $(feedDoc).find("description:first").text(); // Get the channel's description
                    
                    /* Display channel info */
                    $("#chantit").html("<a href=\"" + channelURL + "\">" + channelTitle + "</a>"); // Display the channel's title and link it to the channel's URL
                    $("#chandesc").html(chanDesc); // Display the channel's description
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
        );
    }
);