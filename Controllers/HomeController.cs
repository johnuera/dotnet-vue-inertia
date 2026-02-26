using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace VueInertiaNet.Controllers
{
    public class HomeController : Controller
    { 
        [HttpGet("/", Name = "default")]
        public IActionResult Index()
        {
            ViewData["Ziggy"] = new { url = $"{Request.Scheme}://{Request.Host}", routes = new { } };
            return Inertia.Render("Home/Index", new
            {
                title = "Dashboard",
                message = "This is a test for inertia + Vite + .Net",
                locale = "de",
                user = new
                {
                    name = "John Doe"
                }

            });
        }
    }
}
