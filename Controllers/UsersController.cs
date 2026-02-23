using InertiaCore;
using Microsoft.AspNetCore.Mvc;

public class UsersController : Controller
{
    [HttpGet("/users/{id:int}", Name = "users.show")]
    public IActionResult Show(int id)
    {
        return Inertia.Render("Home/User", new
        {
            id,
            title = "USER"
        });
    }

    [HttpGet("/users", Name = "users.index")]
    public IActionResult Index() => Ok();
}
