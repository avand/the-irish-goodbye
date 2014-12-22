require "rack/rewrite"

use Rack::Static, {
  :root         => "public",
  :header_rules => [["/images", { "Cache-Control" => "public, 31536000"}]],
  :urls         => [
    "/images",
    "/stylesheets",
    "/javascripts"
  ]
}

use Rack::Rewrite do
  r301 "/tim-wendy",      "https://www.dropbox.com/sh/dp7vlzof5bl0tz2/AAChkIdbm_lB14BOdA4QzRUta"
  r301 "/harrison-megan", "https://www.dropbox.com/sh/0kpjzs6pp6pg4ve/AADc871SQf0HSWdrVWdlS6zwa"
  r301 "/april-jerry",    "https://www.dropbox.com/sh/0bbt18qod4z262y/AABHux6B6unB1M3gwt6i7R9ra"
  r301 "/avid-hailey",    "https://www.dropbox.com/sh/ogh4urqf0vorcf4/AAC1uEeW0B6toyOTHmqn_kdTa"
end

run lambda { |env|
  index = File.open('public/index.html', File::RDONLY)

  [
    200,
    {
      "Content-Type" => "text/html",
      "Content-Length" => index.size.to_s
    },
    index
  ]
}
