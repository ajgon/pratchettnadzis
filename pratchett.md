JS:
```js
$('.show-more').click().remove(); JSON.stringify($('li.entry.iC > div.wblock').map(function() { return $(this).html(); }).toArray())
```

Ruby:
```ruby
j=Dir['www.wykop*'].map { |x| File.read(x).split("\n") }.flatten.select { |x| x.include?('Meyru') }.map { |x| JSON.parse(x[1..-2]) }.flatten.map { |x| Nokogiri::HTML(x) }.map { |x| data = x.css('div.text p').text.strip; quote_parts = data.sub(/^.*pratchettnadzis/, '').strip.split("\n"); { id: data.scan(/[0-9]+/).first.to_i, timestamp: x.css('time').attr('datetime').value, quote: quote_parts[0..-2].join("\n"), book: quote_parts.last, link: x.css('a.showProfileSummary + a').attr('href').value } }.uniq { |x| x[:id] }; File.open('pratchett.json', 'w') { |f| f.write(j.to_json) }
```
