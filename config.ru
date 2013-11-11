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
  r301 "/tim-wendy", "https://www.dropbox.com/sh/b36q4s2ss94dc5s/SGtx8oeMv2"
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
