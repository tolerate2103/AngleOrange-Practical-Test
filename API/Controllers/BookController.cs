using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        [Route("LoadItems")]
        [HttpPost]
        public IActionResult LoadItems(Framework.AllCriteria criteria)
        {
            var vm = new ViewModels.BookVm();
            try
            {
                vm.Initialise();
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("LoadBookItem")]
        [HttpGet]
        public IActionResult LoadBookItem(int id)
        {
            var vm = new ViewModels.BookVm();
            try
            {
                vm.LoadItem(id);
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [Route("DeleteRecord")]
        [HttpGet]
        public IActionResult DeleteRecord(int id)
        {
            var vm = new ViewModels.BookVm();
            try
            {
                vm.DeleteRecord(id);
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [Route("PostBook")]
        [HttpPost]
        public IActionResult PostBook(ViewModels.BookVm vm)
        {
            try
            {
                vm.Upsert();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return new JsonResult(vm);
        }


    }
}
