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
  r301 "/tim-wendy",   "https://www.dropbox.com/sh/uvap3fab5w6x5oi/V2UVr3Blje"
  r301 "/harry-megan", "https://www.dropbox.com/sh/b79cixqt7u0kycm/qVpO0uayM4"
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
