import React, { useDeferredValue, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const companies = useSelector((store) => store.company?.companies) || [];

  const searchCompanyByText =
    useSelector((store) => store.company?.searchCompanyByText) || "";

  const navigate = useNavigate();

  // Filter companies (no useEffect needed)
  //   const filteredCompanies = useMemo(() => {
  //     const text = searchCompanyByText.toLowerCase().trim();
  //
  //     if (!text) return companies;
  //
  //     return companies.filter((company) =>
  //       (company?.name || "").toLowerCase().includes(text)
  //     );
  //   }, [companies, searchCompanyByText]);

  // useDeferredValue >> search typing smooth ho jati h
  // useMemo()   >> re-render ko rokne k liye || UI lag s bachane k liye
  // useEffect(() => {},[compnaies, searchCompaniesByText])  ye bhi kar sakte th


  const deferredSearch = useDeferredValue(searchCompanyByText);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      (company?.name || "").toLowerCase().includes(deferredSearch)
    );
  }, [companies, deferredSearch]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently registered companies.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                      }
                      alt={company.name}
                    />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">{company.name}</TableCell>

                <TableCell>
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer py-1">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
