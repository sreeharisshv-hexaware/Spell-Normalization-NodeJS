var natural = require('natural');
var fs = require('fs');
module.exports = {
	conversationNorm: function (country_name) {	
		var json = JSON.parse(require('fs').readFileSync('./country.json', 'utf8'));
		var country_list = json.country;
		var country_list_length = country_list.length;
		var dict = {};

		for(c in country_list){
			dict[country_list[c]]=0;
		}

		for(x in dict)
		{
			dict[x] = natural.JaroWinklerDistance(x, country_name);
		}
		
		var res = Object.keys(dict).reduce(function(a, b){
			if(dict[a]>dict[b])
			{
				if(dict[a] > 0.70)
				{
					return a;
				}
				else
				{
					return "";
				}
			}
			else
			{
				if(dict[b] > 0.70)
				{
					return b;
				}
				else
				{
					return "";
				}
			}
		});

		if(res!="")
		{
			return res;
		}
		else{
			return "No such place.";
		}
	}
}