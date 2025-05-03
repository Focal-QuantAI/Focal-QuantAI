{
  pkgs,
}: {
  command = "npx http-server -p 8080";
  previews = {
    "http://localhost:8080" = {
      name = "index";
      path = "/";
    };
    "http://localhost:8080/silentscribe.html" = {
        name = "silentscribe";
    };
        "http://localhost:8080/sociusai.html" = {
        name = "sociusai";
    };
  };
}
