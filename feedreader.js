function dispFeed(feedURL)
        {
            $.post("feed.php", {fURL: feedURL}, function(data)
                {
                    var feedDoc = $.parseXML(data); // Parse the XML string and create a DOM
                    var nRSS = 1; // # of <rss> tags (Debugging)
                    var nCh = 1; // # of <channel> tags (debugging)
                    
                    $(feedDoc).find("rss").each(function() // Go into the RSS feed tag
                        {
                            console.log("In <rss> #%d", nRSS);
                            
                            $(this).find("channel").each(function() // Go into the channel info
                                {
                                    console.log("In <channel> #%d", nCh);
                                    console.log("Exiting <channel> #%d", nCh)
                                }
                            );
                            
                            console.log("Exiting <rss> #%d", nRSS);
                            ++nRSS; // Increment # of RSS tags seen so far
                        }
                    );
                }
            ) // Tell PHP script to fetch the entries from a feed by querying the database
        }
        
$(document).ready(function()
    {
        $("input").keyup(function(e)
            {
                dispFeed($(this).val());
            }
        );
    }
);