using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactPeopleDatabase.Data
{
	public class PeopleContextFactory : IDesignTimeDbContextFactory<PeopleContext>
	{
		public PeopleContext CreateDbContext(string[] args)
		{
			var config = new ConfigurationBuilder()
				.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactPeopleDatabase"))
				.AddJsonFile("appsettings.json")
				.AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

			return new PeopleContext(config.GetConnectionString("ConStr"));
		}
	}
}
