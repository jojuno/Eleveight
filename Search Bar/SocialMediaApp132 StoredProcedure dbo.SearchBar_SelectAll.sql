USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[SearchBar_SelectAll]    Script Date: 9/11/2018 10:21:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <08/08/2018>
-- Description:	<Return Search Results>
-- =============================================
ALTER PROCEDURE [dbo].[SearchBar_SelectAll]
	-- Add the parameters for the stored procedure here
	@SearchText nvarchar(400),
	@PageNumber int
AS
BEGIN
/* TEST SCRIPT
USE [SocialMediaApp132]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[SearchBar_SelectAll]
		@SearchText = N'wendy',
		@PageNumber = 1

SELECT	'Return Value' = @return_value

GO
*/
	SET NOCOUNT ON;

	-- 1. create a temp table
	-- 2. insert search results into said temp table
	-- 3. return a paged set from temp table

    -- Insert statements for procedure here

	
		if (OBJECT_ID('tempdb..#searchResults') is not null) drop table #searchResults
		


select * 
into #searchResults
from (

	select
		CONCAT(firstName, ' ', lastName) as SearchResultTitle 
		,Id
		,'User profile' as ResultDescription
		,'UserProfile' as ResultType
		,avatarUrl as AvatarUrl
		,CONCAT('http://localhost:3024/user/social/profile/', Id) as ResultUrl
		
	from UserProfile where FirstName like CONCAT('%', @searchText, '%') or LastName like CONCAT('%', @searchText, '%')

	union
	select 
		OrgName as SearchResultTitle
		,Id
		,'Organization' as ResultDescription
		,'Organization' as ResultType
		,null as AvatarUrl
		,null as ResultUrl

	from Organization where OrgName like CONCAT('%', @searchText, '%')
	union

	select
		[Name] as SearchResultTitle 
		,Id
		,[Description] as ResultDescription
		,'Scholarship' as ResultType
		,null as AvatarUrl
		,null as ResultUrl
	from Scholarship where [Name] like CONCAT('%', @searchText, '%') or [Description] like CONCAT('%', @searchText, '%')
) as tblResult



	declare @RecordCount int = (select count(*) from #searchResults)
	declare @PageCount int = @RecordCount / 10
	declare @remainder int = @RecordCount % 10
	if (@remainder > 0) begin
	set @PageCount = @PageCount + 1
	end

	--combine results with the page count
	select *, @RecordCount as RecordCount, @PageCount as [PageCount] from #searchResults
	
	order by ResultType
	offset ((@PageNumber - 1) * 10) rows
	fetch next 10 rows only
	



END
