require "rack/rewrite"

use Rack::Static, :root => "public", :urls => [
  "/images",
  "/stylesheets"
]

use Rack::Rewrite do
  r301 "/tim-wendy", "https://www.dropbox.com/sh/b36q4s2ss94dc5s/SGtx8oeMv2"
end

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
