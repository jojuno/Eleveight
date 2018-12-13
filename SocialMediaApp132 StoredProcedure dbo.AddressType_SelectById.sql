USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[AddressType_SelectById]    Script Date: 9/11/2018 10:10:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Select an address type by ID>
-- =============================================
ALTER PROCEDURE [dbo].[AddressType_SelectById]
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[AddressType_SelectById]
		@Id = 1

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Select [Id], [TypeName], [TypeDescription] from dbo.AddressType
	where Id = @Id

END
