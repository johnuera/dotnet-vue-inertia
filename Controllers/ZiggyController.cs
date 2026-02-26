using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Routing.Patterns;

namespace VueInertiaNet.Controllers;

[ApiController]
public class ZiggyController : ControllerBase
{
    private readonly EndpointDataSource _endpoints;

    public ZiggyController(EndpointDataSource endpoints)
    {
        _endpoints = endpoints;
    }

    [HttpGet("/ziggy", Name = "ziggy")]
    public IActionResult Get()
    {
        var routes = new Dictionary<string, object>();

        foreach (var endpoint in _endpoints.Endpoints.OfType<RouteEndpoint>())
        {
            var routeName = endpoint.Metadata.GetMetadata<IEndpointNameMetadata>()?.EndpointName;
            if (string.IsNullOrWhiteSpace(routeName)) continue;

            var methods = endpoint.Metadata
                .GetMetadata<HttpMethodMetadata>()?.HttpMethods
                ?? new[] { "GET" };

            // Raw template like: "/users/{id:int}"
            var template = endpoint.RoutePattern.RawText ?? "";

            routes[routeName] = new
            {
                uri = template.StartsWith("/") ? template : "/" + template,
                methods
            };
        }

        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        return Ok(new
        {
            url = baseUrl,
            routes
        });
    }
}
